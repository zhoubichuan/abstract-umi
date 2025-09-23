import { Alert } from 'antd';
import type { AlertProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App: React.FC<AlertProps> = (props) => {
  return <Alert {...props}></Alert>;
};

export default App;
