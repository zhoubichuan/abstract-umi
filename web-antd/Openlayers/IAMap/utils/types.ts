import { WKT, WKB } from 'ol/format';
/**
 * 判断是否是promise对象
 * @param {any} target
 * @returns
 */
export const __isPromise = (target: any) => target.toString() === '[object Promise]';

/**
 * 判断是否是数组
 * @param {any} target
 * @returns
 */
export const __isArray = (target: any) => Array.isArray(target);

export const __getFeatureByWKT = function getFeatureByWKT(
  wkt: any,
  sourceCode: any,
  targetCode: any,
) {
  try {
    if (!wkt) {
      return null;
    }
    // 数据格式类型
    let format = new WKT();
    let feature;
    feature = format.readFeature(wkt, {
      featureProjection: targetCode,
      dataProjection: sourceCode,
    });
    return feature;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const __getFeatureByWKB = function getFeatureByWKB(
  coordinate: string,
  sourceCode: any,
  targetCode: any,
) {
  try {
    if (!coordinate) {
      return null;
    }
    // 数据格式类型
    let format = new WKB();
    let feature;
    // 判断收尾，是否为 WKB 格式
    if (coordinate.includes('010')) {
      // 判断字符结尾
      let confirmEnding = function (str: string, target: string | any[]) {
        // 请把你的代码写在这里
        var start = str.length - target.length;
        var arr = str.substr(start, target.length);
        if (arr == target) {
          return true;
        }
        return false;
      };
      if (confirmEnding(coordinate, '40')) {
        feature = format.readFeature(coordinate, {
          dataProjection: sourceCode, // 设定JSON数据使用的坐标系
          featureProjection: targetCode, // 设定当前地图使用的feature的坐标系
        });
      }
    }
    return feature;
  } catch (e) {
    console.log(e);
    return null;
  }
};
