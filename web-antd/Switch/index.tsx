import { Switch } from 'antd';
import type { SwitchProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<SwitchProps> = (props) => {
  return (
    <span className={styles.switch}>
      <Switch {...props}></Switch>
    </span>
  );
};

export default App;
