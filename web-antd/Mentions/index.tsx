/* eslint-disable react/prop-types */
import { Mentions } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<any> & {
  Option: any;
} = (props) => {
  return <Mentions {...props}>{props.children}</Mentions>;
};
App.Option = Mentions.Option;
export default App;
