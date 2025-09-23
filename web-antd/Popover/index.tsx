import { Popover } from 'antd';
import type { PopoverProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<PopoverProps> = (props) => {
  return <Popover {...props}>{props.children}</Popover>;
};

export default App;
