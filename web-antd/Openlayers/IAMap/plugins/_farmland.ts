/**
 * 路障图层
 */

import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Stroke, Style, Fill, Icon } from 'ol/style';
import { transform } from 'ol/proj';
import { getCenter } from 'ol/extent';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
// import { utils } from '@/antd/Openlayers';

export default {
  name: 'farmland',

  install(vm: any) {
    const ia = vm;
    const { $token, $options } = ia;

    // source
    const source = new VectorSource({
      format: new GeoJSON(),
      loader: async (extent) => {
        let res = await ia.$http.get(
          `${ia.$options.url}/gis/geoserver/gisdata/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=gisdata:dy_farmland&outputFormat=application/json&access_token=${$token}`,
        );
        if (res.features) {
          res.features.forEach((item: any) => {
            // let targetFeature = new Feature({
            //   geometry: new Point(transform(item.geometry.coordinates, 'EPSG:4326', 'EPSG:900913'))
            // })
            // targetFeature.setStyle(
            //   new Style({
            //     image: new Icon({
            //       src: require(`@/antd/Openlayers/IAMap/icons/farmland.svg`),
            //     }),
            //   })
            // );
            // source.addFeatures(
            //   targetFeature
            //   // source.getFormat().readFeatures(item, {
            //   //   dataProjection: 'EPSG:4326',
            //   //   featureProjection: 'EPSG:900913',
            //   // })
            // )
            // ia.addFeatureIcon({
            //   type: 'farmland',
            //   position: transform(item.geometry.coordinates, 'EPSG:4326', 'EPSG:900913'),
            //   icon: 'farmland.svg',
            //   active: 'farmland.svg'
            // });
            ia.addIcon({
              type: 'operationIcon',
              position: transform(item.geometry.coordinates, 'EPSG:4326', 'EPSG:900913'),
              icon: 'farmland.svg',
              activeIcon: 'farmland.svg',
              info: {
                machineCode: item.properties.code,
                id: item.properties.id,
                name: item.properties.type,
              },
            });
          });
        }
      },
    });

    // layer
    const layer = new VectorLayer({
      source: source,
      opacity: 1,
      visible: true,
      minZoom: 0,
      maxZoom: 22,
      zIndex: 1005,
      declutter: false,
    });
    return layer;
    // let res = await ia.$http.get(
    //   `${ia.$options.url}/gis/geoserver/gisdata/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=gisdata:dy_farmland&outputFormat=application/json&access_token=${$token}`
    // );
    // console.log(res.features[0],'res.features')
    // return new VectorLayer({
    //   source: new VectorSource({
    //     features: new Feature({ geometry: new Point(
    //       // res.features[0].geometry.coordinate
    //       transform([116.397128,39.916527], 'EPSG:4326', 'EPSG:900913')
    //       // utils.transform()
    //       //
    //       )}),
    //   }),
    //   style: new Style({
    //     image: new Icon({
    //       // anchor: [0.5, 0.5],
    //       src: require(`../icons/farmland.svg`)
    //     }),
    //   }),
    // });
  },

  handle() {},
};
