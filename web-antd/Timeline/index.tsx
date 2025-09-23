/* eslint-disable react/prop-types */
import { Timeline } from 'antd';
import type { TimelineProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<TimelineProps>&{
  Item:any
} = (props) => {
  return <Timeline {...props}>{props.children}</Timeline>;
};
App.Item=Timeline.Item
export default App;
