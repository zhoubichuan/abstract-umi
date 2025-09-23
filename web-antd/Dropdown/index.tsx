import { Dropdown } from 'antd';
import type { DropdownProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<DropdownProps> = (props) => {
  return (
    <div className={styles.dropdown}>
      <Dropdown {...props}>{props.children}</Dropdown>
    </div>
  );
};

export default App;
