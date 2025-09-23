/* eslint-disable react/prop-types */
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import React from 'react';
import './index.module.scss';
import List from './List';
import TabsList from './TabsList';
import SearchList from './SearchList';
import Group from './Group';
import CheckboxForm from './CheckboxForm';
const App: React.FC<any> & {
  Group: any;
  List: typeof List;
  TabsList: typeof TabsList;
  CheckboxForm: typeof CheckboxForm;
  SearchList: typeof SearchList;
} = (props) => {
  return (
    <Checkbox {...props}>
      {React.Children.map(props.children, (child, i) => {
        const childElement = child as React.FunctionComponentElement<any>;
        return React.cloneElement(childElement, {
          key: i
        });
      })}
    </Checkbox>
  );
};
App.List = List;
App.TabsList = TabsList;
App.SearchList = SearchList;
App.Group = Group;
App.CheckboxForm = CheckboxForm;
export default App;
