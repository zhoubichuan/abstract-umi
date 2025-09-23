import { Vector } from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Icon, Stroke, Style, Circle } from 'ol/style';
import { clearSpread, selectedSpread } from '../animation/selected-spread';
// import IAFeatureIcon from '../extends/IAFeatureIcon.js';

export default {
  name: 'animation',

  install(vm: any) {
    const ia = vm;

    const source = new VectorSource();

    // layer
    const layer = new VectorLayer({
      opacity: 1,
      visible: true,
      minZoom: 0,
      maxZoom: 22,
      declutter: false,
      source,
      zIndex: 1001,
      style: (feature) => {
        let {
          icon,
          activeIcon,
          active,
          hide,
          scale: scale1,
          disableSelect,
          zIndex,
          show,
          aniKey,
        } = feature.getProperties();
        let resIcon = icon;
        let anchor = [0.5, 1];
        let scale = scale1 || 0.75;
        if (active && !disableSelect) {
          anchor = [0.5, 0.5];
          resIcon = activeIcon ? activeIcon : icon;
        }
        if (hide) {
          scale = 0;
        }
        return new Style({
          image: new Icon({
            src: require(`@/antd/Openlayers/IAMap/icons/${resIcon}`),
            scale: show ? scale : 0,
            // scale: scale,
            anchor: anchor,
          }),
          zIndex,
        });
      },
    });
    ia.$on('animation', (fea: any, layer: any) => {
      layer
        .getSource()
        .getFeatures()
        .forEach((feaEle: any) => {
          if (feaEle.ol_uid === fea.ol_uid) {
            // if (feaEle instanceof IAFeatureIcon) {
            let { active, disableSelect, aniKey } = feaEle.getProperties();
            feaEle.active = !active;
            if (!disableSelect) {
              if (!active) {
                let aniKey = selectedSpread(feaEle, layer, ia);
                feaEle.set('aniKey', aniKey);
              } else {
                clearSpread(aniKey);
              }
            }
            // } else {
            //   feaEle.set('active', true);
            // }
          } else {
            let { aniKey } = feaEle.getProperties();
            if (aniKey) {
              clearSpread(aniKey);
              feaEle.set('aniKey', '');
            }
            feaEle.set('active', false);
          }
        });
    });
    return layer;
  },

  handle() {},
};
