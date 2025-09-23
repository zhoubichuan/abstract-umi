import React, { useRef, useEffect, useState } from 'react';
import { Map } from './IAMap/index';
import defalutConfig from './config';
interface HeadProps {
  ref?: any;
  point?: any;
  type?: any;
  wkt?: any;
  geojson?: any;
  drawstart?: Function;
  drawend?: Function;
  change?: Function;
  clear?: Function;
  modifyend?: Function;
  remove?: Function;
}
const App: React.FC<HeadProps> = ({ ref, point = [], type = 'coordinate', ...rest }) => {
  const drawstart = (val: any) => {
    if (rest.drawstart) {
      rest.drawstart(val);
    }
  };
  const drawend = (val: any) => {
    if (rest.drawend) {
      rest.drawend(val);
    }
  };
  const change = (val: any) => {
    if (rest.change) {
      rest.change(val);
    }
  };
  const clear = (val: any) => {
    if (rest.clear) {
      rest.clear(val);
    }
  };
  const remove = (val: any) => {
    if (rest.remove) {
      rest.remove(val);
    }
  };
  const mapRef = useRef<any>(null);
  const drawMap = useRef<any>(null);
  const drawLayer = useRef<any>(null);
  useEffect(() => {
    let config: any = {
      ...defalutConfig,
      target: mapRef.current,
      interaction: true,
      controls: false,
      hideCenterCircle: true,
      worker: true,
      plugins: [
        'satellite', // 卫星地图
        'tilePlugin', // 影像底图
        // 'field', // 田块
      ],
    };
    if (window.location.host.includes('localhost')) {
      config.url = 'https://smart-sit.farmbgy.com';
    }
    drawMap.current = new Map(config);
    drawLayer.current = drawMap.current.insertLayer('line', { zIndex: 1006 });
  }, []);

  useEffect(() => {
    drawMap.current.clear('line');
    drawMap.current.insertDraw('line', {
      point: point,
      drawstart,
      drawend,
      change,
      clear,
      remove,
      type,
    });
  }, [point]);
  console.log(drawMap, 'drawMap');
  const handleRemove = (map: any) => {};
  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default App;
