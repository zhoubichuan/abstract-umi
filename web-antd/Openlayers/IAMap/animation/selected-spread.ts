import { Fill, Stroke, Style, Circle } from 'ol/style';
import { getVectorContext } from 'ol/render';
import { easeOut } from 'ol/easing';
import { unByKey } from 'ol/Observable';

const duration = 3000;
export function selectedSpread(feature: any, layer: any, ia: any) {
  feature.set('startTime', Date.now());
  function animate(event: any) {
    const flashGeom = feature.getGeometry().clone();
    const flashGeom1 = feature.getGeometry().clone();
    const frameState = event.frameState;
    const start = feature.get('startTime');
    const elapsed = frameState.time - start;

    const vectorContext = getVectorContext(event);
    const elapsedRatio = elapsed / duration;
    // radius will be 23 at start and 48 at end.
    const radius = easeOut(elapsedRatio) * 20 + 18; // 97/2 43.5
    const opacity = easeOut(1 - elapsedRatio);

    const style = new Style({
      image: new Circle({
        radius: radius,
        stroke: new Stroke({
          color: 'rgba(255, 255, 255, ' + opacity * 0.5 + ')',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(75, 126, 255, ' + opacity * 0.5 + ')',
        }),
      }),
    });
    const style1 = new Style({
      image: new Circle({
        radius: radius - 9,
        stroke: new Stroke({
          color: 'rgba(255, 255, 255, ' + opacity * 0.5 + ')',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(75, 126, 255, ' + opacity * 0.5 + ')',
        }),
      }),
    });
    if (opacity <= 0.05) {
      feature.set('startTime', Date.now());
    }
    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);
    vectorContext.setStyle(style1);
    vectorContext.drawGeometry(flashGeom1);
    ia.$map.render();
  }
  let tLayer = ia.findLayer('tile');
  return tLayer.on('postrender', animate);
}
export function clearSpread(key: any) {
  unByKey(key);
}
