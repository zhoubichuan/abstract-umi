/* eslint-disable react/prop-types */
import { Form } from 'antd';
import Item from './Item';
import Search from './Search';
import Layout from './Layout';
import styles from './index.module.scss';
import React from 'react';
import Text from './Text';
const App: React.FC<any> & {
  Item: any;
  useForm: any;
  Provider: any;
  Search: any;
  Layout: any;
  Text: any;
  List:any;
} = (props) => {
  return <Form {...props}>{props.children}</Form>;
};
App.Item = Item;
App.useForm = Form.useForm;
App.List = Form.List;
App.Provider = Form.Provider;
App.Search = Search;
App.Layout = Layout;
App.Text = Text;
export default App;
