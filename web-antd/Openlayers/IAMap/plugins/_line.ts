import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

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
