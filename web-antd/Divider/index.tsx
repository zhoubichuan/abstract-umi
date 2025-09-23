import { Divider } from 'antd';
import type { DividerProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<DividerProps> = (props) => {
  return (
    <Divider className={'divider'} {...props}>
      {props.children}
    </Divider>
  );
};

export default App;
