/* eslint-disable react/prop-types */
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import styles from './index.module.scss';
import React, { useEffect, useState, useImperativeHandle } from 'react';
interface FieldNames {
  name: string;
  value: string;
}
interface Props {
  request?: Function;
  fieldNames?: FieldNames;
  reload?: any;
  onChange?: any;
  selectRef?: any;
}
const App: React.FC<SelectProps & Props> & {
  Option: any;
  OptGroup: any;
} = (props) => {
  let {
    request,
    fieldNames = { name: 'name', value: 'value' },
    reload,
    selectRef,
    ...restProps
  } = props;
  let [data, setData] = useState([]);
  useEffect(() => {
    initData();
  }, [reload]);
  const initData = async (params?: any) => {
    if (request) {
      let result = await request(params) || [];
      setData(result);
    }
  };
  useImperativeHandle(selectRef, () => {
    return {
      handleReload: (params?: any) => {
        initData(params);
      },
    };
  });
  if (request) {
    return (
      <div className={styles.select}>
        <Select {...restProps}>
          {data.map((item: any, index: number) => (
            <Select.Option
              value={item[fieldNames.value] === null ? '' : item[fieldNames.value]}
              key={index}
            >
              {item[fieldNames.name]}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  } else {
    return <Select {...restProps}>{props.children}</Select>;
  }
};
App.Option = Select.Option;
App.OptGroup = Select.OptGroup;
App.displayName = 'Select';
export default App;
