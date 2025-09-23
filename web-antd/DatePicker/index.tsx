import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<DatePickerProps> & { RangePicker: any } = (props) => {
  return <DatePicker {...props}></DatePicker>;
};
const RangePicker: React.FC<any> = (props) => {
  return (
    <div className={styles.rangePicker}>
      <DatePicker.RangePicker {...props}></DatePicker.RangePicker>
    </div>
  );
};
App.RangePicker = RangePicker;
export default App;
