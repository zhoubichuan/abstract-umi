import { Map, View } from 'ol';
import { MousePosition, ScaleLine } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { normalizePlugins } from './options';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { getFarmCenter } from './constant';
// const jsts = require("jsts/dist/jsts.min.js")

// import Douglas from './worker/douglas.worker';

export function initMaxin(IAMap: any) {
  IAMap.prototype._init = function (options: any) {
    // let {
    //   interactions: { },
    //   layers: { },
    //   target: '',
    //   view: { },
    // } = options
    const ia = this;
    ia.$options = options;
    ia.$gisCenterPoint = options.gisCenterPoint;
    ia.$map = Object.create(null);
    ia.$layers = [];
    ia.$icons = [];
    ia.$featureIcons = [];
    ia.$mode = options.mode || 'single';
    ia.$limit = options.limit || 10;
    ia.$field = [];
    ia.frozen = false;
    ia.$options.plugins = normalizePlugins(options.plugins);
    ia.$jIndex = 1;
    ia.$tIndex = 0;
    ia.$hideCenterCircle = options.hideCenterCircle || false;
    // ia.$worker = options.worker ? new Douglas() : null;

    // ia.$parser = new jsts.io.OL3Parser()
    // ia.$parser.inject(
    //   Point,
    //   LineString,
    //   LinearRing,
    //   Polygon,
    //   MultiPoint,
    //   MultiLineString,
    //   MultiPolygon
    // )

    // 缓存插件
    ia._cache = Object.create(null);
    ia.$map = ia.initMap({ target: ia.$options.target, controls: ia.$options.control });
    ia.initEvent();
    ia.initView();
    ia.initPlugins();
    ia.initProj();
    // ia.generateLayer()
  };

  /**
   *
   * 初始化地图
   */
  IAMap.prototype.initMap = function ({ target, controls }: any) {
    return new Map({
      target: target,
      controls: controls.scaleLine ? [new ScaleLine()] : [],
    });
  };

  /**
   *
   * 初始化视图
   */
  IAMap.prototype.initView = function () {
    const mapCenter = getFarmCenter();
    const ia = this;
    const options = {
      projection: 'EPSG:3857',
      center: ia.$gisCenterPoint || mapCenter,
      zoom: 18,
      minZoom: 0,
      maxZoom: 22,
    };
    const view = new View(options);

    ia.$options = Object.assign(ia.$options, options);

    ia.$map.setView(view);
  };

  /**
   *
   * 注册坐标
   */
  IAMap.prototype.initProj = function () {
    proj4.defs('EPSG:32649', '+proj=utm +zone=49 +datum=WGS84 +units=m +no_defs');
    register(proj4);
  };
}
