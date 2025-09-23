import { Segmented } from 'antd';
import type { SegmentedProps } from 'antd';
import styles from './index.module.scss';
import React from 'react';
import Tabs from './Tabs';
const App: React.FC<any> & {
  Tabs: any;
} = (props) => {
  return (
    <div className={styles.segmented}>
      <Segmented {...props}></Segmented>
    </div>
  );
};
App.Tabs = Tabs;
export default App;
