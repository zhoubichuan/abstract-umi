import { Select } from 'ol/interaction';
import { NOT_CLICK_ABLE } from './constant';

export function eventsMixin(IAMap: any) {
  /**
   *
   * 初始化事件
   * 为IAMap实例添加$events属性作为事件总线
   * 同时根据初始化options的interaction值, 为地图添加交互
   */
  IAMap.prototype.initEvent = function () {
    const ia = this;
    const { $options } = ia;
    ia.$events = Object.create(null);

    if ($options.interaction) {
      this.initInteraction();
    }
  };

  // 创建select实例, 为map添加交互对象
  IAMap.prototype.initInteraction = function () {
    const ia = this;
    const { $map } = ia;

    // const interaction = new Select({
    //   filter(feature, layer) {
    //     const { values_: { _name } } = layer

    //     console.log(_name, feature)

    //     // ia.$emit(EventContrast[_name], feature, layer)
    //     // const { values_: { _name } } = layer

    //     // if (FilterContrast.includes(_name)) {
    //     //   return false
    //     // } else {
    //     //   console.log(EventContrast[_name], feature, layer)

    //     //   return

    //     //   ia.$emit(EventContrast[_name], feature, layer)
    //     //   return false
    //     // }
    //   }
    // })

    const interaction = new Select({
      filter: function (feature, layer) {
        // ia.$emit('mapClick', feature, layer);
        // const {
        //   values_: { _name },
        // } = layer;
        // if (NOT_CLICK_ABLE.includes(_name)) {
        //   return false;
        // }

        // // 广播layer的同名事件
        // ia.$emit(_name, feature, layer);
        // // 改变要素的isSelec
        return true;
      },
    });

    interaction.on('select', (e) => {
      interaction.getFeatures().clear();
    });

    ia.$interaction = interaction;
    $map.addInteraction(interaction);
  };

  /**
   *
   * 事件绑定
   * @param {String} type type for events
   * @param {Function} fn call function
   */
  IAMap.prototype.$on = function (type: any, fn: any) {
    const ia = this;
    const { $events } = ia;
    const entry = $events[type] || ($events[type] = []);
    entry.push(fn);
  };

  IAMap.prototype.a = function () {};

  IAMap.prototype.$a = function () {};

  /**
   *
   * 事件解绑
   * @param {String} type type for events
   * @param {Function} fn call function
   */
  IAMap.prototype.$off = function () {
    // const ia = this
    // const cbs = ia.$events[type]
    // if (cbs) {
    //   for (let i = 0; i < cbs.length; i ++) {
    //     if (fn === cbs[i]) {
    //       cbs.splice(i, 1)
    //       break
    //     }
    //   }
    // }
  };

  /**
   *
   * 事件触发
   * @param {String} type
   * @param  {...any} args
   */
  IAMap.prototype.$emit = function (type: any, ...args: any) {
    const ia = this;

    if (ia.$events[type]) {
      ia.$events[type].forEach((fn: any) => {
        fn.call(this, ...args);
      });
    }
  };
}
