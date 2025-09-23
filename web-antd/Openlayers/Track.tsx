import React, { useRef, useEffect, useState } from 'react'; //eslint-disable-line
// import styles from "./index.module.scss";
import { Map } from './IAMap/index';
import { transform } from 'ol/proj';
import defalutConfig from './config';
interface HeadProps {
  ref?: any;
  point: any;
  track: any;
  children?: any;
  index: number;
}

const App: React.FC<HeadProps> = ({ point = [], index = 0, children, track }) => {
  const mapRef = useRef<any>(null);
  const trackMap = useRef<any>(null);
  useEffect(() => {
    let config: any = {
      ...defalutConfig,
      target: mapRef.current,
      interaction: true,
      controls: false,
      hideCenterCircle: true,
      worker: true
    };
    if (window.location.host.includes('localhost')) {
      config.url = 'https://smart-sit.farmbgy.com';
    }
    trackMap.current = new Map(config);
    trackMap.current.insertLayer('icon', { zIndex: 1005 });
    trackMap.current.insertLayer('route', { zIndex: 1004 });
    // trackMap.current.insertLayer('planRoute', { zIndex: 999 });
    // trackMap.current.insertLayer('dispatch:machine', { zIndex: 1005 })
  }, []);
  useEffect(() => {
    if (track.length) {
      trackMap.current.center(point[0]);
      trackMap.current.dispatchPath(track || []);
    }
  }, [track]);
  useEffect(() => {
    trackMap.current.clear('icon');
    trackMap.current.insertIcon('icon', {
      point: point[index - 1] || [],
      icon: 'tractor.svg',
      anchor: [0.48, 0.95]
    });
    trackMap.current.clear('route');
    trackMap.current.insertLine('route', {
      color: '#FF7A46',
      width: 5,
      point: point.slice(0, index + 1)
    });
  }, [index]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
      {React.Children.map(children, (child, i) => {
        const childElement = child as React.FunctionComponentElement<any>;
        return React.cloneElement(childElement, {
          key: i
        });
      })}
    </div>
  );
};

export default App;
