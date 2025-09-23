import { Checkbox, List, Tabs, Radio } from '..';
import type { CheckboxProps } from 'antd';
import React, { useEffect, useState } from 'react';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import './index.module.scss';
interface Props {
  selectList: any;
  data: any;
  onChange?: any;
  tabsKeyChange?: any;
}
enum MTYPE {
  待分配,
  已分配,
  全部,
}

const App: React.FC<CheckboxProps & Props> = (props) => {
  const [checkedValues, setCheckedValues] = useState([] as any);
  const [tabsKey, setTabsKey] = useState('');
  const CheckboxOnChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedValues(checkedValues);
    props.onChange(checkedValues);
    console.log(checkedValues,'checkedValues')
  };
  useEffect(() => {
    setCheckedValues(props.selectList);
  }, [props.selectList]);
  const handleTabsChange = (key: string) => {
    setTabsKey(key);
    // setCheckedValues([]);
    // props.tabsKeyChange(key);
  };
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const [value, setValue] = useState(2);
  return (
    <Checkbox.Group value={checkedValues} style={{ width: '100%' }} onChange={CheckboxOnChange}>
      <Tabs
        onChange={handleTabsChange}
        defaultActiveKey="1"
        tabBarExtraContent={
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={2}>{MTYPE[2]}</Radio>
            <Radio value={0}>{MTYPE[0]}</Radio>
            <Radio value={1}>{MTYPE[1]}</Radio>
          </Radio.Group>
        }
      >
        {Object.keys(props.data).map((key: any) => {
          return (
            <Tabs.TabPane
              tab={props.data[key][0].machineryCategoryName}
              key={key}
              style={{ height: '510px', overflow: 'hidden auto' }}
            >
              {
                <List
                  grid={{
                    gutter: 16,
                    column: 4,
                  }}
                  dataSource={
                    value === 2
                      ? props.data[key]
                      : props.data[key].filter((item: any) => item.isAllocate === value)
                  }
                  renderItem={(item: any) => {
                    return (
                      <List.Item>
                        {React.Children.map(props.children, (child, i) => {
                          const childElement = child as React.FunctionComponentElement<any>;
                          return React.cloneElement(childElement, {
                            item: item,
                            key: key + i,
                          });
                        })}
                      </List.Item>
                    );
                  }}
                />
              }
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </Checkbox.Group>
  );
};
export default App;
