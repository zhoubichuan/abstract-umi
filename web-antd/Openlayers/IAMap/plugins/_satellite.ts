import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import url from './source/index';
export default {
  name: 'satellite',

  install(vm: any) {
    return new TileLayer({
      source: new XYZ({
        url: url.tianditu
      })
    });
  }
};
