import React, { useRef, useEffect, useState } from 'react'; //eslint-disable-line
// import styles from "./index.module.scss";
import { Map } from './IAMap/index';
interface HeadProps {
  ref?: any;
  line?: any;
}
let map: any = null;
const App: React.FC<HeadProps> = ({ line = [] }) => {
  const mapRef = useRef<any>(null);
  const newMap = (point = []) => {
    let config: any = {
      target: mapRef.current,
      interaction: true,
      token: JSON.parse(localStorage.getItem('auth') || '')?.access_token,
      code: 'sanshui',
      controls: false,
      hideCenterCircle: true,
      worker: true,
    };
    if (window.location.host.includes('localhost')) {
      config.url = 'https://smart-sit.farmbgy.com';
    }
    map = new Map(config);
    map.insertLayer('line'); // 实时路径图层
  };
  useEffect(() => {
    if (!map) {
      newMap(line);
    } else {
      map.clear('line');
      map.insertIcon('line', {
        point: line,
        icon: 'wurenji.png',
        anchor: [0.48, 0.95],
      });
    }
  }, [line]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default App;
