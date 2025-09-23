/* eslint-disable react/prop-types */
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<TabsProps> & {
  TabPane: any;
} = (props) => {
  let { children } = props;
  return (
    <div className={styles.tabs}>
      <Tabs {...props}>
        {React.Children.map(children, (child, i) => {
          const childElement = child as React.FunctionComponentElement<any>;
          return React.cloneElement(childElement, {
            key: i,
          });
        })}
      </Tabs>
    </div>
  );
};
App.TabPane = Tabs.TabPane;
export default App;
