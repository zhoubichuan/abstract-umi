import { scale } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { transform } from 'ol/proj';
import { clearSpread, selectedSpread } from '../animation/selected-spread';
import { Style, Icon } from 'ol/style';
let uid = 0;
export default class IAFeatureIcon extends Feature<any> {
  public _active: any;
  public $options: any;
  public $icon: any;
  public $active: any;
  public $ia: any;
  public $type: any;
  public info: any;
  public _show: any;
  public _uid: any;
  public $rotate: any;
  public $geom: any;
  get active() {
    return this._active;
  }
  set active(v) {
    this._active = v;
    this.dispatchEvent('change:active');
    this.set('active', v);
  }

  constructor(options: any) {
    super(options);
    this._init(options);
  }

  _init(options: any) {
    this.$options = options;
    this.$icon = options.icon;
    this.$active = options.active;
    this.$ia = options.ia;
    this.$type = options.type;
    this.info = options.info;
    this._active = false;
    this._show = true;
    this._uid = uid++;
    this.$rotate = options.rotate;
    let pos = options.position;

    this.$geom = new Point(pos);
    this.initEvent();
    this.setGeometry(this.$geom);
    this.setProperties({
      icon: this.$icon,
      activeIcon: this.$active,
      active: this._active,
      disableSelect: options.disableSelect,
      scale: options.scale,
      zIndex: options.zIndex,
      show: this._show
    });
  }

  initEvent() {}

  move(point: any) {
    this.$geom.setCoordinates(point);
  }

  change(icon: any) {
    // 改变style
  }
  rotate(rotate: any) {
    // 改变style
    this.setStyle(
      new Style({
        image: new Icon({
          rotation: rotate,
          src: require(`@/antd/Openlayers/IAMap/icons/${this.$icon}`)
        })
      })
    );
  }

  update({ point, icon, rotate }: any) {
    // 更新位置
    if (point) {
      this.move(point);
    }
    if (icon) {
      this.change(icon);
    }
    if (rotate) {
      this.rotate(rotate);
    }
  }

  hide() {
    // TODO: 改变style scale 0
    this.set('show', false);
    this.dispatchEvent('hide');
  }

  show(ani = true) {
    // TODO: 改变style scale 1
    this.set('show', true);
    this.dispatchEvent('show');
  }
}
