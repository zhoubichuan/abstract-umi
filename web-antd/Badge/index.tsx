import { Badge } from 'antd';
import type { BadgeProps } from 'antd';
import styles from './index.module.scss';
import React from 'react';
const App: React.FC<BadgeProps> = (props) => {
  return (
    <span className={styles.badge}>
      <Badge {...props}>{props.children}</Badge>
    </span>
  );
};

export default App;
