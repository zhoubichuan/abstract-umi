import { Checkbox, List, Form, Radio, Input } from '..';
import type { CheckboxProps } from 'antd';
import React, { useEffect, useState, createRef, useMemo } from 'react';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import styles from './index.module.scss';
interface Props {
  selectList: any;
  data: any;
  onChange?: any;
  tabsKeyChange?: any;
}
enum MTYPE {
  离线,
  在线,
  全部
}

const App: React.FC<CheckboxProps & Props> = (props) => {
  let { data } = props;
  const searchRef = createRef<any>();
  const [checkedValues, setCheckedValues] = useState([] as any);
  const CheckboxOnChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedValues(checkedValues);
    props.onChange(checkedValues);
  };
  useEffect(() => {
    setCheckedValues(props.selectList);
  }, [props.selectList]);
  const onChange = (e: any) => {
    setValue(e.target.value);
    setDataSource(data.filter((item: any) => item.isAllocate !== e.target.value));
  };
  const [value, setValue] = useState(2);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setDataSource(data);
  }, [data]);
  return (
    <Checkbox.Group value={checkedValues} style={{ width: '100%' }} onChange={CheckboxOnChange}>
      <div style={{ margin: '20px 0' }}>
        <Form.Search
          layout
          refreshBtn={true}
          defalutValue={{ type: 2 }}
          onSearchRef={searchRef}
          columns={useMemo(
            () => [
              {
                name: 'type',
                render: () => (
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={2}>{MTYPE[2]}</Radio>
                    <Radio value={1}>{MTYPE[1]}</Radio>
                    <Radio value={0}>{MTYPE[0]}</Radio>
                  </Radio.Group>
                )
              },
              {
                name: 'name',
                render: () => <Input placeholder="请输入农机名称/编号" showCount={false} />
              }
            ],
            []
          )}
          requestFn={({ type, name }: any) => {
            setDataSource(
              data
                .filter((item: any) => item.isAllocate !== type)
                .filter((item: any) => item.code.includes(name.trim()) || item.name.includes(name.trim()))
            );
          }}
        />
      </div>
      <div className={styles.list}>
        <List
          grid={{
            gutter: 16,
            column: 4
          }}
          dataSource={dataSource}
          renderItem={(item: any, index: number) => {
            return (
              <List.Item>
                {React.Children.map(props.children, (child, i) => {
                  const childElement = child as React.FunctionComponentElement<any>;
                  return React.cloneElement(childElement, {
                    item: item,
                    key: i + index
                  });
                })}
              </List.Item>
            );
          }}
        />
      </div>
    </Checkbox.Group>
  );
};
export default App;
