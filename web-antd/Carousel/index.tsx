import { Carousel } from 'antd';
import type { CarouselProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<CarouselProps> = (props) => {
  return <div className={styles.carousel}><Carousel {...props}>{props.children}</Carousel></div>;
};

export default App;
