/* eslint-disable react/prop-types */
import { Breadcrumb } from 'antd';
import type { BreadcrumbProps, BreadcrumbItemProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<BreadcrumbProps> & {
  Item: React.FC<BreadcrumbItemProps>;
} = (props) => {
  let { children } = props;
  return (
    <div className={styles.breadcrumb}>
      <Breadcrumb {...props}>
        {React.Children.map(children, (child, i) => {
          const childElement = child as React.FunctionComponentElement<any>;
          return React.cloneElement(childElement, {
            key: i,
          });
        })}
      </Breadcrumb>
    </div>
  );
};
App.Item = Breadcrumb.Item;
export default App;
