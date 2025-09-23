import IAMap from '.';
import { __isArray, __isPromise } from './utils/types';

/**
 *
 * 插件混入函数
 * @param {*} IAMap
 */
export function pluginsMixin(IAMap: any) {
  /**
   *
   * 初始化插件, 传入插件列表, 遍历列表并调用IAMap的$use挂载
   * @param {*} plugins
   */
  IAMap.prototype.initPlugins = function () {
    const ia = this;
    const {
      $options: { plugins },
    } = ia;
    plugins &&
      plugins.forEach((plug: any) => {
        ia.$use(plug);
      });

    // ia.initHandle()
  };

  /**
   *
   * 初始化插件的交互事件
   */
  IAMap.prototype.initHandle = function () {
    const ia = this;
    const { $plugins } = ia;

    if ($plugins && __isArray($plugins)) {
      $plugins.forEach((plug: any) => {
        plug.handle && plug.handle.call(ia);
      });
    }
  };

  /**
   *
   * 对外暴露的挂载方法, 调用插件的install方法
   * @param {*} plugin
   */
  IAMap.prototype.$use = function (plugin: any) {
    const ia = this;
    const { _cache } = ia;

    if (process.env.NODE_ENV !== 'production' && _cache[plugin.name]) {
      console.warn(`${plugin.name} already loaded!`);
    }

    const plug = plugin.install.call(ia, ia);

    if (__isPromise(plug)) {
      plug.then((res: any) => {
        ia._mount(plugin.name, res);
      });
    } else {
      ia._mount(plugin.name, plug);
    }
  };

  /**
   *
   * 挂载plugin
   * @param {*} name
   * @param {*} plugin
   */
  IAMap.prototype._mount = function (name: any, plugin: any) {
    const ia = this;
    const { _cache, $layers, $map } = ia;

    _cache[name] = plugin;
    $layers.push(plugin);
    $map.addLayer(plugin);
  };
}
