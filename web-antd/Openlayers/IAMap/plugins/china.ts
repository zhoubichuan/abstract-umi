import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import url from './source/index';

export default {
  name: 'china',

  install(vm: any) {
    return new TileLayer({
      minZoom: 2,
      maxZoom: 20,
      source: new XYZ({
        url: url.tianditu
      })
    });
  }
};
