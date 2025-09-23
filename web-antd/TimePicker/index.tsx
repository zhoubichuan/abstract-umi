import { TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<TimePickerProps> = (props) => {
  return <TimePicker {...props}></TimePicker>;
};

export default App;
