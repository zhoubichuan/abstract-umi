import { PluginList } from './constant';
import { isNil, isEmpty, isString, isObject } from 'lodash';

/**
 *
 * 画点的默认参数
 * @param {*} opts
 * @returns
 * @example
 * {
 *  color: '#ebb563',
 *  radius: 5,
 *  borderColor: '#ebb563'
 * }
 */
export const mergeLineOptions = (opts: any) => {
  return Object.assign(
    {
      color: '#11c3d0',
      width: 2,
      type: 'solid',
    },
    opts,
  );
};

/**
 *
 * 画线的默认参数
 * @param {*} opts
 * @returns
 * @example
 * {
 *  color: '#ebb563',
 *  radius: 5,
 *  borderColor: '#ebb563'
 * }
 */
export const mergePointOptions = (opts: any) => {
  return Object.assign(
    {
      color: '#ebb563',
      radius: 5,
      borderColor: '#ebb563',
    },
    opts,
  );
};

/**
 *
 * 画线的默认参数
 * @param {*} opts
 * @returns
 * @example
 * {
 *  color: '#ebb563',
 *  radius: 5,
 *  borderColor: '#ebb563'
 * }
 */
export const mergeIconOptions = (opts: any) => {
  return Object.assign(
    {
      icon: '',
      info: Object.create(null),
    },
    opts,
  );
};

/**
 *
 * @param {*} opts
 * @returns
 * @example
 * {
 *  code: '',        // 田块code
 *  highlight: true, // 是否高亮
 *  center: true,    // 是否移动到地图中
 *  zoom: true,      // 是否将田块放到最大
 * }
 */
export const mergeFocusOptions = (opts: any) => {
  return Object.assign(
    {
      highlight: true,
      center: true,
      zoom: true,
    },
    opts,
  );
};

export const normalizePlugins = (plugins: any) => {
  if (isNil(plugins) || isEmpty(plugins)) {
    return PluginList;
  }
  return PluginList.filter((item) => plugins.includes(item.name));
};
