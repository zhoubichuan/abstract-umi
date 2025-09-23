import { Checkbox, List } from 'antd';
import type { CheckboxProps } from 'antd';
import React, { useEffect, useState } from 'react';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import './index.module.scss';
interface Props {
  selectList: any;
  data: any;
  onChange?: any;
}
const App: React.FC<CheckboxProps & Props> = (props) => {
  const [checkedValues, setCheckedValues] = useState([] as any);
  const CheckboxOnChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedValues(checkedValues);
    console.log(checkedValues, 'checkedValues');
    props.onChange(checkedValues);
  };
  useEffect(() => {
    setCheckedValues(props.selectList);
  }, [props.selectList]);
  return (
    <Checkbox.Group value={checkedValues} style={{ width: '100%' }} onChange={CheckboxOnChange}>
      <List
        style={{ height: '580px', overflow: 'hidden auto' }}
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={props.data}
        renderItem={(item: any) => {
          return (
            <List.Item>
              {React.Children.map(props.children, (child, i) => {
                const childElement = child as React.FunctionComponentElement<any>;
                return React.cloneElement(childElement, {
                  item: item,
                  key: i,
                });
              })}
            </List.Item>
          );
        }}
      />
    </Checkbox.Group>
  );
};
export default App;
