/**
 * 路障图层
 */

import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Stroke, Style, Fill, Icon } from 'ol/style';
import { transform } from 'ol/proj';
import { getCenter } from 'ol/extent';

export default {
  name: 'machine',

  install(vm: any) {
    const ia = vm;
    const { $token, $options } = ia;

    // source
    const source = new VectorSource({
      format: new GeoJSON(),
      loader: async (extent) => {
        let res = await ia.$http.get(
          `${ia.$options.url}/gis/geoserver/gisdata/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=gisdata:s_facility&outputFormat=application/json&access_token=${$token}`,
        );

        // source.addFeatures(
        //   source.getFormat().readFeatures(res, {
        //     dataProjection: 'EPSG:4326',
        //     featureProjection: 'EPSG:900913',
        //   })
        // )

        res.features.forEach((item: any) => {
          //   ia.addFeatureIcon({
          //     type: 'machine',
          //     position: transform(getCenter(item.bbox), 'EPSG:4326', 'EPSG:900913'),
          //     icon: 'machine.svg',
          //     active: 'machine.svg'
          //   });
          ia.addFeatureIcon({
            type: 'operationIcon',
            position: transform(item.geometry.coordinates, 'EPSG:4326', 'EPSG:900913'),
            icon: 'machine.svg',
            active: 'machine.svg',
            info: {
              machineCode: item.properties.code,
              id: item.properties.id,
              name: item.properties.name,
            },
          });
          // ia.addIcon({
          //   type: 'operationIcon',
          //   position: transform(item.geometry.coordinates, 'EPSG:4326', 'EPSG:900913'),
          //   icon: 'machine.svg',
          //   activeIcon: 'machine.svg',
          //   info: {
          //     machineCode: item.properties.code,
          //     id: item.properties.id,
          //     name: item.properties.type
          //   }
          // })
        });
      },
    });

    // layer
    const layer = new VectorLayer({
      source: source,
      opacity: 1,
      visible: true,
      minZoom: 0,
      maxZoom: 22,
      zIndex: 100,
      declutter: false,
      style: (res) => {
        return new Style({
          image: new Icon({
            src: require(`@/antd/Openlayers/IAMap/icons/agm.svg`),
          }),
        });
      },
    });

    return layer;
  },

  handle() {},
};
