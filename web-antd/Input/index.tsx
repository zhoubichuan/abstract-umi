/* eslint-disable react/prop-types */
import { Input } from 'antd';
import type { InputProps } from 'antd';
import Circle from './Circle';
import Password from './Password';
import React from 'react';
import Double from './Double';
import styles from './index.module.scss';

const App: React.FC<InputProps> & {
  TextArea: typeof Input.TextArea;
  Password: typeof Password;
  Group: typeof Input.Group;
  Circle: typeof Circle;
  Double: typeof Double;
} = (props) => {
  return (
    <div className={styles.input}>
      <Input allowClear showCount maxLength={32} {...props}>
        {props.children}
      </Input>
    </div>
  );
};
App.TextArea = Input.TextArea;
App.Password = Password;
App.Group = Input.Group;
App.Circle = Circle;
App.Double = Double;
App.displayName = 'Input';
export default App;
