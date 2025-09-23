import { Transfer } from 'antd';
import type { TransferProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<any> = (props) => {
  return <Transfer {...props}>{props.children}</Transfer>;
};

export default App;
