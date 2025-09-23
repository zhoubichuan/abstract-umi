import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';

export default class IAIcon extends Feature<any> {
  // constructor(options) {
  //   super({
  //     info: options.info ? options.info : {}, // 调用者自定义属性
  //     type: 'point',
  //     geometry: new Point(options.point),
  //   });
  //   this.$options = options;
  //   this._init(options);
  // }
  // _init(options) {
  //   const _this = this;
  //   _this.icon = options.icon;
  //   _this.rotation = options.rotation;
  //   let _options = {
  //     scale: 0.9,
  //     src: require(`@/antd/Openlayers/IAMap/icons/${options.icon}`),
  //   };
  //   options.anchor && (_options.anchor = options.anchor);
  //   let style = [
  //     new Style({
  //       anchor: [0.5, 0.5],
  //       image: new Icon(_options),
  //     }),
  //   ];
  //   if (options.corner) {
  //     style.push(
  //       new Style({
  //         anchor: [0.5, 0.5],
  //         image: new Icon({
  //           rotation: options.rotation,
  //           scale: 0.9,
  //           src: require(`@/antd/Openlayers/IAMap/icons/corner.svg`),
  //         }),
  //       }),
  //     );
  //   }
  //   this.setStyle(style);
  // }
  // change(options) {
  //   let point = new Point(options.point);
  //   this.setGeometry(point);
  //   let opts = Object.assign(this.$options, options);
  //   this.values_.info = opts.info;
  //   if (opts.corner) {
  //     this.setStyle([
  //       new Style({
  //         image: new Icon({
  //           scale: 0.9,
  //           src: require(`@/antd/Openlayers/IAMap/icons/${opts.icon}`),
  //         }),
  //       }),
  //       new Style({
  //         image: new Icon({
  //           rotation: opts.rotation,
  //           scale: 0.9,
  //           src: require(`@/antd/Openlayers/IAMap/icons/corner.svg`),
  //         }),
  //       }),
  //     ]);
  //   } else {
  //     this.setStyle(
  //       new Style({
  //         image: new Icon({
  //           rotation: opts.rotation,
  //           scale: 0.9,
  //           src: require(`@/antd/Openlayers/IAMap/icons/${opts.icon}`),
  //         }),
  //       }),
  //     );
  //   }
  // }
}
