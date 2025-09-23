import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import { Stroke, Style, Fill, Text, Circle } from 'ol/style';
import { getCenter } from 'ol/extent';
import Feature from 'ol/Feature';
import { Point, MultiPoint } from 'ol/geom';
import { transform } from 'ol/proj';
import { toContext } from 'ol/render';
export default {
  name: 'fields',

  async install(vm: any) {
    const ia = vm;
    const { $token, $farmId, $farmCode, $mode, $limit, $field } = ia;

    // 田块缓存
    ia._fieldCache = Object.create(null);

    ia.insertLayer('fields');

    const farmParam = {
      farmId: $farmId,
      limit: -1,
      page: 0,
    };

    let land: any = await fetch(`/hx-farm/api-farm/v3/farmland/getPage`);

    function add(code: any, idx: any) {
      let info = ia._fieldCache[code];
      const layer = ia.findLayer('fields');

      const feature = new Feature({
        geometry: new Point(info.center),
      });

      feature.setId(code);
      feature.set('code', code);

      feature.setStyle(() => {
        return [
          // new Style({
          //   text: new Text({
          //     font: '16px',
          //     textAlign: 'center',
          //     fontWeight: '500',
          //     text: `${idx}`,
          //     fill: new Fill({
          //       color: '#FFF',
          //     }),
          //   }),
          // }),
          new Style({
            image: new Circle({
              fill: new Fill({
                color: 'rgba(75, 126, 255, 0.5)',
              }),
              stroke: new Stroke({
                color: 'rgba(255, 255, 255, 0.5)',
                width: 3,
              }),
              radius: 25,
            }),
          }),
        ];
      });

      layer.insertFeatures(feature);
    }

    function remove(code: any) {
      const layer = ia.findLayer('fields');

      layer
        .getSource()
        .getFeatures()
        .forEach((item: any) => {
          if (item.id_ === code) {
            layer.getSource().removeFeature(item);
          }
        });
    }

    const source: any = new VectorSource({
      format: new GeoJSON(),
      loader: async (extent) => {
        // 获取田块要素
        let res = await ia.$http.get(
          `${ia.$options.url}/geoserver/${$farmCode}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${$farmCode}:d_farmland&outputFormat=application/json&access_token=${$token}`,
        );

        if (res.features) {
          // 添加要素到source中
          source.addFeatures(
            source.getFormat().readFeatures(res, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:900913',
            }),
          );

          source.getFeatures().forEach((item: any) => {
            let target = land.result.data.find((l: any) => l.gisCode === item.values_.code);

            item.values_.idx = 0;

            if (target) {
              item.values_.name = target.name;
            } else {
              item.values_.name = '';
            }

            // defineSelect(item, defaultStyle, selectStyle)
            Object.defineProperty(item, 'isSelect', {
              get() {
                return this._isSelect;
              },
              set(val) {
                if (val) {
                  if ($mode === 'multiple') {
                    this.values_.idx = $field.indexOf(this.values_.code) + 1;
                    // add(this.values_.code, this.values_.idx)
                    this.setStyle(() => {
                      return [
                        new Style({
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
                          text: new Text({
                            font: '16px',
                            textAlign: 'center',
                            text: `${this.values_.idx}`,
                            fill: new Fill({
                              color: '#FFF',
                            }),
                          }),
                        }),
                        new Style({
                          image: new Circle({
                            fill: new Fill({
                              color: 'rgba(75, 126, 255, 0.5)',
                            }),
                            stroke: new Stroke({
                              color: 'rgba(255, 255, 255, 0.5)',
                              width: 3,
                            }),
                            radius: 25,
                          }),
                          geometry: function (feature) {
                            const center = ia._fieldCache[item.values_.code].center;
                            return new Point(center);
                          },
                        }),
                      ];
                    });
                  } else {
                    this.setStyle(() => {
                      return new Style({
                        text: new Text({
                          font: '16px',
                          textAlign: 'center',
                          text: `${this.values_.name}`,
                          fill: new Fill({
                            color: '#FFF',
                          }),
                        }),
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
                  }
                } else {
                  if ($mode === 'multiple') {
                    remove(this.values_.code);
                  }
                  this.setStyle(() => {
                    return new Style({
                      text: new Text({
                        font: '16px',
                        textAlign: 'center',
                        text: this.values_.name,
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
        }
      },
    });

    const layer: any = new VectorLayer({
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
    ia.$on('fields', (feature: any, layer: any) => {
      if (ia.frozen) {
        return;
      }
      layer
        .getSource()
        .getFeatures()
        .forEach((item: any) => {
          if ($mode === 'single') {
            if (item === feature) {
              item.isSelect = !item.isSelect;
              // ia.$emit('field:multiple', item, ia.$field)
            } else {
              item.isSelect = false;
            }
          }

          if ($mode === 'multiple') {
            if (item === feature) {
              if (item.isSelect) {
                item.isSelect = false;
                ia.$field.splice(ia.$field.indexOf(item.values_.code), 1);
                ia.$emit('field:multiple', ia.$field);
              } else {
                if (ia.$field.length < $limit) {
                  ia.$field.push(item.values_.code);
                  item.isSelect = true;
                  ia.$emit('field:multiple', ia.$field);
                }
              }
            }
          }

          // if ($mode === 'multiple') {
          //   if (item === feature) {
          //     if (item.isSelect) {
          //       item.isSelect = false
          //       ia.$field.splice(ia.$field.indexOf(item.values_.code), 1)
          //       ia.$emit('field:multiple', ia.$field)
          //     } else {
          //       if (ia.$field.length < $limit) {
          //         item.isSelect = true
          //         ia.$field.push(item.values_.code)
          //         ia.$emit('field:multiple', ia.$field)
          //       }
          //     }
          //   }
          // }
          // if ($mode === 'single') {
          //   if (item === feature) {
          //     item.isSelect = !item.isSelect
          //     ia.$emit('field:multiple', item, ia.$field)
          //   } else {
          //     item.isSelect = false
          //   }
          // }
        });
    });

    return layer;
  },
};
