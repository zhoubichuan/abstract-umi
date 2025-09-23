import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';

export default {
  name: 'line',

  install(vm: any) {
    const ia = vm;
    // ia._lineCache = Object.create(null)

    const layer = new VectorLayer({
      visible: true,
      source: new VectorSource({
        features: [],
      }),
    });

    return layer;
  },
};
