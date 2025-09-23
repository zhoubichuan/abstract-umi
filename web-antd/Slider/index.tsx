import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import React from 'react';
import style from './index.module.scss';
const App: React.FC<SliderSingleProps> = (props) => {
  return <Slider {...props}></Slider>;
};

export default App;
