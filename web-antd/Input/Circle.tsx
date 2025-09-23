import { Input } from '..';
import type { InputProps } from 'antd';
import styles from './index.module.scss';
import React from 'react';
const App: React.FC<InputProps> = (props) => {
  return (
    <span className={styles.circle}>
      <Input {...props}>{props.children}</Input>
    </span>
  );
};
export default App;
