import { Vector } from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import { Icon, Style, Text, Fill } from 'ol/style';

export default {
  name: 'waterDropText',

  install(vm: any) {
    const ia = this;
    // layer
    const layer = new VectorLayer({
      minZoom: 0,
      maxZoom: 22,
      source: new VectorSource(),
      zIndex: 1001,
      style: (feature) => {
        let { zIndex, text } = feature.getProperties();
        return new Style({
          image: new Icon({
            src: require(`@/antd/Openlayers/IAMap/icons/waterDrop.svg`),
            anchor: [0.5, 1], // 中心点
          }),
          text: new Text({
            font: '10px',
            textAlign: 'center',
            offsetY: -14,
            text: String(text) || '123',
            fill: new Fill({
              color: '#FFF',
            }),
          }),
          zIndex,
        });
      },
    });
    return layer;
  },
};
