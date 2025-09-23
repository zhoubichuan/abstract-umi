import Feature from 'ol/Feature';
import {
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  LinearRing
} from 'ol/geom';
import { Style, Stroke, Fill } from 'ol/style';
// const jsts = require("jsts/dist/jsts.min.js")

export default class IABuffer extends Feature<any> {
  public $point!: any;
  public $options!: any;
  public $parser!: any;
  constructor(options: any) {
    super({
      type: 'line',
      geometry: new LineString(options.point)
    });
    this.$point = options.point;
    this._init(options);
  }

  _init(options: any) {
    this.$options = options;
    // this.$parser = new jsts.io.OL3Parser()
    this.$parser.inject(
      Point,
      LineString,
      LinearRing,
      Polygon,
      MultiPoint,
      MultiLineString,
      MultiPolygon
    );

    this.setStyle(
      new Style({
        // stroke: new Stroke({
        //   color: options.stroke || [47, 183, 85, 0.5],
        //   width: 4
        // }),
        // 填充
        fill: new Fill({
          color: options.fill || [47, 183, 85, 0.5]
        })
      })
    );
  }

  update({ points, width }: any) {
    const _this = this;

    if (points) {
      let line = new LineString(points);
      const jstsGeom = this.$parser.read(line);
      const buffered = jstsGeom.buffer(width + 0.1, 0, 2);
      this.setGeometry(this.$parser.write(buffered));
    }
  }
}
