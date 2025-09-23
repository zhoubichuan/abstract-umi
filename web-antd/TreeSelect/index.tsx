/* eslint-disable react/prop-types */
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
interface Props {
  request?: (...parmas: any) => void;
  loadData?: (...parmas: any) => void;
}
const App: React.FC<TreeSelectProps<any> & Props> = (props) => {
  let { request, loadData, value, onChange, ...restProps } = props;
  let [data, setData] = useState<any>([]);
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    if (request) {
      let result = await request();
      setData(result);
    }
  };
  return (
    <TreeSelect
      value={value}
      onChange={(a: any, b: any, c: any) => {
        console.log(a, b, c, '---value', props.value);
        onChange?.(a, b, c);
      }}
      allowClear
      treeDefaultExpandAll
      treeData={data}
      {...restProps}></TreeSelect>
  );
};
App.displayName = 'TreeSelect';
export default App;
