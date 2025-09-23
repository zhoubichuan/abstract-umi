import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Stroke, Style, Fill, Icon } from 'ol/style';

export default {
  name: 'sign',

  install(vm: any) {
    const ia = vm;
    const token = ia.$token;
    const source: any = new VectorSource({
      format: new GeoJSON(),
      loader: async (extent) => {
        let res = await ia.$http.get(
          `${ia.$options.url}/gis/geoserver/gisdata/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=gisdata:dy_farmland&outputFormat=application/json&access_token=${token}`,
        );

        source.addFeatures(
          source.getFormat().readFeatures(res, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:900913',
          }),
        );
      },
    });

    return new VectorLayer({
      source: source,
      opacity: 1,
      visible: true,
      minZoom: 0,
      maxZoom: 22,
      declutter: false,
      style: (res) => {
        return new Style({
          image: new Icon({
            src: require(`@/antd/Openlayers/IAMap/icons/exit.svg`),
          }),
        });
      },
    });
  },

  handle() {},
};
