import { Input } from 'antd';
import type { InputProps } from 'antd';
import styles from './index.module.scss';
import React from 'react';
const App: React.FC<InputProps> = (props) => {
  return (
    <span className={styles.password}>
      <Input.Password {...props}>{props.children}</Input.Password>
    </span>
  );
};
export default App;
