/**
 * 运维点图层
 */

import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Stroke, Style, Fill, Icon } from 'ol/style';
import { transform } from 'ol/proj';

export default {
  name: 'operation',

  async install(vm: any) {
    const ia = vm;
    const { $token, $options } = ia;

    let res = await ia.$http.get(
      `${ia.$options.url}/geoserver/${ia.$farmCode}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${ia.$farmCode}:uav_operation&outputFormat=application/json&access_token=${$token}`,
    );

    // [12564729.146098873, 2697820.142700865]
    res.features.forEach((item: any) => {
      ia.addFeatureIcon({
        type: 'operationIcon',
        position: transform(item.geometry.coordinates, 'EPSG:4326', 'EPSG:900913'),
        icon: 'operation.svg',
        active: 'operation_active.svg',
        info: {
          machineCode: item.properties.code,
          id: item.properties.id,
          name: item.properties.name,
        },
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

    // source
    // const source = new VectorSource({
    //   format: new GeoJSON(),
    //   loader: async (extent) => {

    //     let res = await ia.$http.get(`${ia.$options.url}/geoserver/${ia.$farmCode}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${ia.$farmCode}:uav_operation&outputFormat=application/json&token=${$token}`, )

    //     source.addFeatures(
    //       source.getFormat().readFeatures(res, {
    //         dataProjection: 'EPSG:4326',
    //         featureProjection: 'EPSG:900913',
    //       })
    //     )

    //     source.getFeatures().forEach(item => {
    //       item.change = (options) => {
    //         item.setStyle(
    //           new Style({
    //             image: new Icon({
    //               rotation: options.rotation,
    //               src: require(`@/antd/Openlayers/IAMap/icons/${options.icon}`)
    //             })
    //           })
    //         )
    //       }
    //     })
    //   }
    // })

    // layer
    const layer = new VectorLayer({
      // source: source,
      opacity: 1,
      visible: true,
      minZoom: 0,
      maxZoom: 22,
      declutter: false,
      style: (res) => {
        return new Style({
          image: new Icon({
            src: require(`@/antd/Openlayers/IAMap/icons/operation.svg`),
          }),
        });
      },
    });

    return layer;
  },

  handle() {},
};
