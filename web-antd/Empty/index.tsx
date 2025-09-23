import { Empty } from 'antd';
import type { EmptyProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<EmptyProps> = (props) => {
  return (
    <div className={styles.empty}>
      <Empty {...props}>{props.children}</Empty>
    </div>
  );
};

export default App;
