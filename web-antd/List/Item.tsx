/* eslint-disable react/prop-types */
import { List } from 'antd';
import Meta from './Meta';
import React from 'react';
const App: React.FC<any> & { Meta: any } = (props) => (
  <List.Item {...props}>{props.children}</List.Item>
);
App.Meta = Meta;
export default App;
