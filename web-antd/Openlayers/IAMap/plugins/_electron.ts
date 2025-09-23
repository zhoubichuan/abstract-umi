import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

/**
 *
 * 电子地图
 */

export default {
  name: 'electron',

  install(vm: any) {
    return new TileLayer({
      source: new XYZ({}),
    });
  },
};
