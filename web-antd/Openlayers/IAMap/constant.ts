import {
  tilePlugin,
  routePlugin,
  roadPlugin,
  electronPlugin,
  // fieldSignPlugin,
  fieldBlockPlugin,
  satellitePlugin,
  fieldCenterPlugin,
  cameraPlugin,
  // operationPlugin,
  // iconAnimationPlugin,
  // waterDropText,
  roadblock,
  // machine,
  farmland,
  fields
} from './plugins/index';
import { getCenter } from 'ol/extent';

// 插件列表
export const PluginList = [
  fields, //田块地图
  satellitePlugin, // 卫星地图
  // roadblock, // 路障
  // machine, // 农机库
  farmland, // 引导点
  tilePlugin, // 影像底图

  // fieldSignPlugin, // 田块出入口
  fieldBlockPlugin // 田块
  // cameraPlugin, // 摄像头
  // fieldCenterPlugin, // 地块中心点
  // routePlugin, // 道路线

  // operationPlugin, // 无人机运维点
  // iconAnimationPlugin, // 扩散图标 动画图层
  // waterDropText, // 水滴背景图+变量文字
];

// 不需要点击的layer
export const FilterContrast = ['fieldCenterPlugin', 'fields'];

// 不可以点击的layer
export const NOT_CLICK_ABLE = ['center'];

export const getFarmCenter = () => {
  const mapConfig = localStorage.getItem('mapConfig');
  let mapCenter = [12564793.370284531, 2697869.17091075];
  if (mapConfig) {
    const layerConfig = JSON.parse(mapConfig);
    let extent = [];
    if (layerConfig.extent) {
      extent = layerConfig.extent;
    } else if (layerConfig.wmts && layerConfig.wmts.basemap && layerConfig.wmts.basemap.bbox) {
      extent = layerConfig.wmts.basemap.bbox;
    }
    if (extent) {
      mapCenter = getCenter(extent);
    }
  }
  return mapCenter;
};
