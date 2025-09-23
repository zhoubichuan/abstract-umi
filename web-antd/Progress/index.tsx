import { Progress } from 'antd';
import type { ProgressProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<ProgressProps> = (props) => {
  return <Progress {...props}>{props.children}</Progress>;
};

export default App;
