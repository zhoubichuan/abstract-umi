import { Rate } from 'antd';
import type { RateProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<RateProps> = (props) => {
  return <Rate {...props}></Rate>;
};

export default App;
