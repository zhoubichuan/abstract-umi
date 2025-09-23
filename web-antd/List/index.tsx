import { List } from 'antd';
import Item from './Item';
import React from 'react';
const App: React.FC<any> & {
  Item: any;
} = (props) => <List {...props}></List>;
App.Item = List.Item;
export default App;
