import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<PaginationProps> = (props) => {
  return <Pagination {...props}></Pagination>;
};

export default App;
