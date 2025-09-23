import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Circle, Stroke, Fill } from 'ol/style';

export default class IAPoint extends Feature<any> {
  public $options:any
  constructor(options: any) {
    super({
      info: options.info, // 调用者自定义属性
      type: 'point',
      geometry: new Point(options.point),
    });
    this.$options = options;
    this._init(options);
  }

  _init(options: any) {
    const _this = this;

    this.setStyle(
      new Style({
        image: new Circle({
          // 半径
          radius: options.radius,
          // 描边
          stroke: new Stroke({
            color: options.stroke
          }),
          // 填充
          fill: new Fill({
            color: options.fill
          })
        })
      })
    );
  }

  //   change(options:any) {
  //     let geo = this.getGeometry();
  //     let opts = Object.assign(this.$options, options);
  //     geo.setCoordinates(opts.point);

  //     this.setStyle(
  //       new Style({
  //         image: new Circle({
  //           // 半径
  //           radius: opts.radius,
  //           // 描边
  //           stroke: new Stroke({
  //             color: opts.stroke,
  //           }),
  //           // 填充
  //           fill: new Fill({
  //             color: opts.fill,
  //           }),
  //         }),
  //       }),
  //     );
  //   }
}
