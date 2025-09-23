/**
 * 田块信息
 */

import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Stroke, Style, Fill, Text, Circle } from 'ol/style';
import { getCenter } from 'ol/extent';

export default {
  name: 'field',

  install(vm: any) {
    const ia = vm;
    const { $token, $farmCode, $mode, $limit } = ia;

    // 田块缓存
    ia._fieldCache = Object.create(null);
    // source
    const source: any = new VectorSource({
      format: new GeoJSON(),
      loader: async (extent) => {
        // 获取田块要素
        let res = await ia.$http.get(
          `${ia.$options.url}/gis/geoserver/gisdata/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=gisdata:d_farmland&outputFormat=application/json&access_token=${$token}`,
        );
        // 添加要素到source中
        source.addFeatures(
          source.getFormat().readFeatures(res, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:900913',
          }),
        );

        source.getFeatures().forEach((item: any) => {
          // defineSelect(item, defaultStyle, selectStyle)
          Object.defineProperty(item, 'isSelect', {
            get() {
              return this._isSelect;
            },
            set(val) {
              if (val) {
                this.setStyle(() => {
                  return new Style({
                    fill: new Fill({
                      color: [75, 126, 255, 0.5],
                    }),
                    stroke: new Stroke({
                      // 描边
                      width: 2,
                      color: '#FFFFFF',
                      lineDash: [8, 4],
                      lineCap: 'butt',
                    }),
                  });
                });
              } else {
                this.setStyle(() => {
                  return new Style({
                    fill: new Fill({
                      // 填充
                      color: [153, 153, 144, 0.2],
                    }),
                    stroke: new Stroke({
                      // 描边
                      width: 2,
                      color: '#FFFFFF',
                      lineDash: [8, 4],
                      lineCap: 'butt',
                    }),
                  });
                });
              }
              this._isSelect = val;
            },
          });

          ia._fieldCache[item.values_.code] = {
            center: getCenter(item.values_.geometry.extent_),
            extent: item.values_.geometry.extent_,
            feature: item,
            layer: layer,
          };
        });

        ia.$emit('field:load');
      },
    });
    // layer
    const layer = new VectorLayer({
      source: source,
      opacity: 1,
      visible: true,
      minZoom: 0,
      maxZoom: 22,
      declutter: false,
      style: (res: any) => {
        return new Style({
          text: new Text({
            font: '16px',
            textAlign: 'center',
            text: res.values_.name,
            fill: new Fill({
              color: '#FFF',
            }),
          }),
          fill: new Fill({
            // 填充
            color: [153, 153, 144, 0.2],
          }),
          stroke: new Stroke({
            // 描边
            width: 2,
            color: '#FFFFFF',
            lineDash: [8, 4],
            lineCap: 'butt',
          }),
        });
      },
    });

    // 田块点击事件
    ia.$on('field', (feature: any, layer: any) => {
      if (ia.frozen) {
        return;
      }
      layer
        .getSource()
        .getFeatures()
        .forEach((item: any) => {
          if ($mode === 'multiple') {
            if (item === feature) {
              if (item.isSelect) {
                item.isSelect = false;
                ia.$field.splice(ia.$field.indexOf(item.values_.code), 1);
                ia.$emit('field:multiple', ia.$field);
              } else {
                if (ia.$field.length < $limit) {
                  item.isSelect = true;
                  ia.$field.push(item.values_.code);
                  ia.$emit('field:multiple', ia.$field);
                }
              }
            }
          }
          if ($mode === 'single') {
            if (item === feature) {
              item.isSelect = !item.isSelect;
              ia.$emit('field:multiple', item, ia.$field);
            } else {
              item.isSelect = false;
            }
          }
        });
    });

    ia.$on('field:multiple', function (list: any) {
      layer
        .getSource()
        .getFeatures()
        .forEach((item: any) => {
          if (list.includes(item.values_.code)) {
            item.isSelect = true;
          } else {
            item.isSelect = false;
          }
        });
    });

    return layer;
  },

  // handle() {
  //   const ia = this

  //   ia.$on('field:block', (feature, layer) => {
  //     const target = ia.$findFeature(layer.values_._name, 'code', feature.values_.code)

  //     layer.getSource().getFeatures().forEach(item => {
  //       if (item !== target) {
  //         item.isSelect = false
  //       }
  //     })

  //     target.$toggleSelect()
  //   })
  // }
};
