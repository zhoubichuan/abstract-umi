import { WMTS } from 'ol/source';
import { get as getProjection } from 'ol/proj';
import { getTopLeft, getWidth } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { Tile as TileLayer } from 'ol/layer';
import _ from 'lodash';
export default {
  name: 'tile',

  install(vm: any) {
    const ia = vm;
    const proj = getProjection('EPSG:900913');
    const extent = proj.getExtent();
    const size = getWidth(extent) / 256;
    const resolutions = [];
    const matrixIds = []; // 矩阵 ID
    const localMapConfig = localStorage.getItem('mapConfig');
    let mapBbox = [];
    if (localMapConfig) {
      const parseConfig = JSON.parse(localMapConfig);
      mapBbox = _.get(parseConfig, 'wmts.basemap.bbox', []);
    }

    for (let i = 0; i < 23; i++) {
      resolutions[i] = size / Math.pow(2, i);
      matrixIds[i] = `EPSG:900913:${i}`;
    }
    const source: any = new WMTS({
      url: `/gis/geoserver/gwc/service/wmts`,
      layer: `gisdata:raster_basemap_${ia.$options.code}`,
      style: '',
      matrixSet: 'EPSG:900913', // 矩阵集
      format: 'image/png',
      wrapX: true,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(extent),
        resolutions,
        matrixIds
      })
    });

    return new TileLayer({
      opacity: 1,
      visible: true,
      extent: mapBbox.length ? mapBbox : extent, // 边界
      minZoom: 0,
      maxZoom: 22,
      preload: 0,
      source: source
    });
  }
};
