import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';
import React from 'react';
import './index.module.scss';
const App = (props: AutoCompleteProps) => {
  return <AutoComplete {...props}>{props.children}</AutoComplete>;
};

export default App;
