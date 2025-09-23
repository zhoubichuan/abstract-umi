import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<CalendarProps<any>> = (props) => {
  return (
    <div className={styles.calendar}>
      <Calendar {...props}></Calendar>
    </div>
  );
};

export default App;
