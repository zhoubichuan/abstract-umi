/* eslint-disable react/prop-types */
import { Table } from 'antd';
import styles from './index.module.scss';
import Pagination from './Pagination';
import Edit from './Edit';
import Form from './Form';
import React from 'react';
const App: React.FC<any> & {
  Column: any;
  ColumnGroup: any;
  Pagination: any;
  Edit: any;
  Form: any;
} = (props) => {
  return <Table {...props}>{props.children}</Table>;
};
App.Column = Table.Column;
App.ColumnGroup = Table.ColumnGroup;
App.Pagination = Pagination;
App.Edit = Edit;
App.Form = Form;
export default App;
