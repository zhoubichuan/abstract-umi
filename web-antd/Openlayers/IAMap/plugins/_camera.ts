import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

const onlineStyle = () => {};

export default {
  name: 'camera',

  install(vm: any) {
    const ia = vm;
    const { $token, $options } = ia;
    const source: any = new VectorSource({
      format: new GeoJSON(),
      loader: async (extent) => {
        let res = await ia.$http.get(
          `${ia.$options.url}/geoserver/${ia.$farmCode}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${ia.$farmCode}:c_camera&outputFormat=application/json&access_token=${$token}`,
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
      style(res) {
        // console.log(res)
      },
    });
  },

  handle() {},
};
