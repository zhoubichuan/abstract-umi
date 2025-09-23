import Feature from 'ol/Feature';
import { LineString } from 'ol/geom';
import { Style, Stroke } from 'ol/style';
import Douglas from '../worker/douglas.worker';

export default class IALine extends Feature<any> {
  constructor(options: any) {
    super({
      type: 'line',
      geometry: new LineString(options.point),
    });

    this._init(options);
  }

  _init(options: any) {
    const _this = this;

    _this.setStyle(
      new Style({
        stroke: new Stroke({ ...options }),
      }),
    );
  }

  // 实时路径
  update({ point }: any) {
    const _this = this;
    const geo = _this.getGeometry();

    if (point) {
      // geo.appendCoordinate(point);
    }
  }

  // 完整路径
  completeLine(points: any) {
    const _this = this;
    _this.setGeometry(new LineString(points));
  }

  // 完整路径
  change(points: any) {
    const _this = this;

    _this.setGeometry(new LineString(points));
  }
}
