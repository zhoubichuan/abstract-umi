import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';

const App: React.FC<InputNumberProps> = (props) => (
  <div className={styles.inputNumber}>
    <InputNumber {...props}>{props.children}</InputNumber>
  </div>
);
export default App;
