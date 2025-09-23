import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

export default {
  name: 'road',

  install(vm: any) {
    return new TileLayer({
      source: new XYZ({}),
    });
  },
};
