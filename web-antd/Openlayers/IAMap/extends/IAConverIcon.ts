import Overlay from 'ol/Overlay';

let uid = 0;
export default class IAConverIcon extends Overlay {
  // [x: string]: any;
  // constructor(options) {
  //   const element = document.createElement('div');
  //   element.classList.add('h-map-icon');
  //   element.innerHTML = `
  //     <div class="h-map-icon-outside"></div>
  //     <div class="h-map-icon-inside"></div>
  //     <img class="h-map-icon-img" style="transform: rotate(${
  //       options.rotate
  //     }deg);" src="${require(`@/antd/Openlayers/IAMap/icons/${options.icon}`)}" />
  //   `;
  //   const opts = Object.assign(
  //     {
  //       positioning: 'center-center',
  //       element: element,
  //       rotate: 0,
  //     },
  //     options,
  //   );
  //   super(opts);
  //   element.parentElement.style.transition = 'all';
  //   this._init(opts);
  // }
  // _init(options) {
  //   this.$options = options;
  //   this.$icon = options.icon;
  //   this.$active = options.activeIcon;
  //   this.$element = options.element;
  //   this.$ia = options.ia;
  //   this.$type = options.type;
  //   this.info = options.info;
  //   this.active = false;
  //   this._active = false;
  //   this._show = true;
  //   this._uid = uid++;
  //   this.$rotate = options.rotate;
  //   this.define();
  //   this.initEvent();
  // }
  // initEvent() {
  //   const _this = this;
  //   const { $element, $ia, $type } = this;
  //   $element.addEventListener('click', function (e) {
  //     $ia.$icons.forEach((item) => {
  //       if (item._uid !== _this._uid) {
  //         item.active = false;
  //       }
  //     });
  //     _this.active = !_this.active;
  //     $ia.$emit($type, _this.info, _this, _this.active);
  //   });
  // }
  // define() {
  //   Object.defineProperty(this, 'active', {
  //     get() {
  //       return this._active;
  //     },
  //     set(val) {
  //       if (val) {
  //         this.$element.classList.add('is-active');
  //         if (this.$active) {
  //           this.change(this.$active);
  //         }
  //       } else {
  //         this.$element.classList.remove('is-active');
  //         this.change(this.$icon);
  //       }
  //       this._active = val;
  //     },
  //   });
  // }
  // move(point) {
  //   this.setPosition(point);
  // }
  // change(icon) {
  //   let img = this.$element.querySelector('.h-map-icon-img');
  //   img.src = require(`@/antd/Openlayers/IAMap/icons/${icon}`);
  // }
  // update({ point, icon, rotate }) {
  //   if (point) {
  //     this.move(point);
  //   }
  //   if (icon) {
  //     this.change(icon);
  //   }
  //   if (rotate) {
  //     this.$element.style.transform = `rotate(${rotate}deg)`;
  //   }
  // }
  // hide() {
  //   this.$element.classList.add('is-hide');
  //   this._show = false;
  // }
  // show() {
  //   this.$element.classList.remove('is-hide');
  //   this._show = true;
  // }
}
