import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<TooltipProps> = (props) => {
  return <Tooltip {...props}>{props.children}</Tooltip>;
};

export default App;
