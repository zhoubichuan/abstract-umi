import 'ol/ol.css';
import { initMaxin } from './init';
import { globalApiMixin } from './globalApi';
import { pluginsMixin } from './plugins';
import { eventsMixin } from './events';

export class Map {
  constructor(options: any) {
    this._init(options);
  }
  private _init(options: any) {
    throw new Error('Method not implemented.');
  }
}
initMaxin(Map);
eventsMixin(Map);
globalApiMixin(Map);
pluginsMixin(Map);

export default Map;
