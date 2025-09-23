import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Text, Style, Fill, Circle, Stroke } from 'ol/style';

export default {
  name: 'center',

  async install(vm: any) {
    const ia = vm;
    const { $token, $farmId } = ia;

    const farmParam = {
      farmId: $farmId,
      limit: -1,
      page: 0,
    };
    let land: any = await fetch(`/hx-farm/api-farm/v3/farmland/getPage`);

    const source: any = new VectorSource({
      format: new GeoJSON(),
      loader: async (extent) => {
        let res = await ia.$http.get(
          `${ia.$options.url}/geoserver/${ia.$farmCode}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${ia.$farmCode}:dp_farmland&outputFormat=application/json&access_token=${$token}`,
        );

        source.addFeatures(
          source.getFormat().readFeatures(res, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:900913',
          }),
        );

        source.getFeatures().forEach((item: any) => {
          let target = land.result.data.find((l: any) => l.gisCode === item.values_.pcode);
          item.values_.name = target && target.name ? target.name : '';
          item.isSelect = false;
          item._isSelect = false;
          item.values_.idx = 0;
          Object.defineProperty(item, 'isSelect', {
            get() {
              return this._isSelect;
            },
            set(val) {
              if (val) {
                this.setStyle(() => {
                  if (ia.$hideCenterCircle) {
                    new Style({
                      text: new Text({
                        font: '16px',
                        textAlign: 'center',
                        text: `${this.values_.idx}`,
                        fill: new Fill({
                          color: '#FFF',
                        }),
                      }),
                    });
                  } else {
                    return [
                      new Style({
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
                      }),
                    ];
                  }
                });
              } else {
                this.setStyle(() => {
                  return new Style({
                    text: new Text({
                      font: '16px',
                      textAlign: 'center',
                      offsetY: 5,
                      text: this.values_.name,
                      fill: new Fill({
                        color: '#FFF',
                      }),
                    }),
                  });
                });
              }
              this._isSelect = val;
            },
          });
        });
      },
    });

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
            offsetY: 5,
            text: res.values_.name,
            fill: new Fill({
              color: '#FFF',
            }),
          }),
        });
      },
    });

    ia.$on('field:multiple', function (list: any) {
      layer
        .getSource()
        .getFeatures()
        .forEach((item: any) => {
          item.isSelect = false;
          list.forEach((l: any, index: any) => {
            if (item.values_.pcode === l) {
              item.isSelect = true;
              item.values_.idx = index + 1;
            }
          });
        });
    });

    return layer;
  },
};
