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
  name: 'roadblock',

  install(vm: any) {
    const ia = vm;
    const { $token, $options } = vm;

    // source
    const source = new VectorSource({
      format: new GeoJSON(),
      loader: async (extent) => {
        let res = await ia.$http.get(
          `${ia.$options.url}/geoserver/${ia.$farmCode}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${ia.$farmCode}:ba_barrier&outputFormat=application/json&access_token=${$token}`
        );

        // source.addFeatures(
        //   source.getFormat().readFeatures(res, {
        //     dataProjection: 'EPSG:4326',
        //     featureProjection: 'EPSG:900913',
        //   })
        // )

        if (res.features) {
          res.features.forEach((item: any) => {
            ia.addFeatureIcon({
              type: 'roadblock',
              position: transform(getCenter(item.bbox), 'EPSG:4326', 'EPSG:900913'),
              icon: 'roadblock.svg',
              active: 'roadblock.svg'
            });
            // ia.addIcon({
            //   type: 'operationIcon',
            //   position: transform(item.geometry.coordinates, 'EPSG:4326', 'EPSG:900913'),
            //   icon: 'operation.svg',
            //   activeIcon: 'operation_active.svg',
            //   info: {
            //     machineCode: item.properties.code,
            //     id: item.properties.id,
            //     name: item.properties.name
            //   }
            // })
          });
        }
      }
    });

    // layer
    const layer = new VectorLayer({
      source: source,
      opacity: 1,
      visible: true,
      minZoom: 0,
      maxZoom: 22,
      zIndex: 106,
      declutter: false
      // style: (res) => {
      //   return new Style({
      //     image: new Icon({
      //       src: require(`@/antd/Openlayers/IAMap/icons/agm.svg`),
      //     }),
      //   })
      // }
    });

    return layer;
  },

  handle() {}
};
