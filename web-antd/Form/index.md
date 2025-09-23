---
title: Form
nav:
  path: /components
---

# Form

```tsx
import { Button, Checkbox, Form, Input } from 'myselfantd'
import React from 'react'

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>
          <span>Remember me</span>
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

## Form.Search

```tsx
/**
 * title: 搜索组件
 * desc: 自定义配置搜索输入框，内部有搜索和重置按钮模板，点击会触发相关事件，通过requestFn事件回调将搜索结果呈现，配和搜索条件字段实现搜索功能。
 */
import { Form,Cascader,Select } from 'myselfantd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';
const App: React.FC = () => {
  let searchRef = createRef<any>();
  const [showDialod, setVisible] = useState(false);
  const [tableData, setTableData] = useState({
    data: [],
    page: { total: 0, pageSize: 20, current: 1 },
  });
  const getSearchData = ({ data, current, pageSize, total }: any) => {
    setTableData({ data: data, page: { total: total, pageSize: pageSize, current: current } });
  };
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    searchRef.current?.handleSearch({ current: pagination.current, pageSize: pagination.pageSize });
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Form.Search columns={[
            {
              name: 'machineNameMt',
              render: () => (
                <Cascader
                  request={async () => {
                    // let { result } = await getDeviceList({ category: 0 });
                    let result=[]
                    return result;
                  }}
                  fieldNames={{ label: 'name', value: 'id' }}
                  placeholder="选择农机类型"
                />
              ),
            },
            {
              name: 'type',
              render: () => (
                <Select placeholder="选择报警类型" allowClear>
                  <Select.Option value={0}>阈值报警</Select.Option>
                  <Select.Option value={1}>围栏报警</Select.Option>
                </Select>
              ),
            },
          ]} onRef={searchRef} searchData={getSearchData} requestFn={() => {}} />
    </div>
  );
};

export default App;
```

### 1.自定义添加按钮

```tsx
/**
 * title: 自定义添加按钮
 * desc: 通过子组件可以灵活的定义添加按钮。
 */
import { Form,Cascader,Select,Button } from 'myselfantd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';
const App: React.FC = () => {
  let searchRef = createRef<any>();
  const [showDialod, setVisible] = useState(false);
  const [tableData, setTableData] = useState({
    data: [],
    page: { total: 0, pageSize: 20, current: 1 },
  });
  const getSearchData = ({ data, current, pageSize, total }: any) => {
    setTableData({ data: data, page: { total: total, pageSize: pageSize, current: current } });
  };
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    searchRef.current?.handleSearch({ current: pagination.current, pageSize: pagination.pageSize });
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div style={{position:'relative'}}>
      <Form.Search columns={[
            {
              name: 'machineNameMt',
              render: () => (
                <Cascader
                  request={async () => {
                    // let { result } = await getDeviceList({ category: 0 });
                    let result=[]
                    return result;
                  }}
                  fieldNames={{ label: 'name', value: 'id' }}
                  placeholder="选择农机类型"
                />
              ),
            },
            {
              name: 'type',
              render: () => (
                <Select placeholder="选择报警类型" allowClear>
                  <Select.Option value={0}>阈值报警</Select.Option>
                  <Select.Option value={1}>围栏报警</Select.Option>
                </Select>
              ),
            },
          ]}
          onRef={searchRef}
          searchData={getSearchData}
          requestFn={() => {}}
          >
            <div style={{position: 'absolute',right: '20px'}}>
              <Button.Image type="primary" htmlType="submit" icon={'add'} onClick={()=>{}}>
                  添加农机
              </Button.Image>
            </div>
          </Form.Search>
    </div>
  );
};

export default App;
```

### 2.无按钮搜索栏

```tsx
/**
 * title: 无按钮搜索栏
 * desc: 自定义搜索输入框，用户操作输入框，改变输入框内内容触发onChange事件，作出相关的搜索行为。
 */
import { Form,Cascader,Select } from 'myselfantd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';
const App: React.FC = () => {
  let searchRef = createRef<any>();
  const [showDialod, setVisible] = useState(false);
  const [tableData, setTableData] = useState({
    data: [],
    page: { total: 0, pageSize: 20, current: 1 },
  });
  const getSearchData = ({ data, current, pageSize, total }: any) => {
    setTableData({ data: data, page: { total: total, pageSize: pageSize, current: current } });
  };
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    searchRef.current?.handleSearch({ current: pagination.current, pageSize: pagination.pageSize });
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Form.Search
      type={true}
      columns={[
            {
              name: 'machineNameMt',
              render: () => (
                <Cascader
                  request={async () => {
                    // let { result } = await getDeviceList({ category: 0 });
                    let result=[]
                    return result;
                  }}
                  fieldNames={{ label: 'name', value: 'id' }}
                  placeholder="选择农机类型"
                />
              ),
            },
            {
              name: 'type',
              render: () => (
                <Select placeholder="选择报警类型" allowClear>
                  <Select.Option value={0}>阈值报警</Select.Option>
                  <Select.Option value={1}>围栏报警</Select.Option>
                </Select>
              ),
            },
          ]} onRef={searchRef} searchData={getSearchData} requestFn={() => {}} />
    </div>
  );
};

export default App;
```
## Form.Layout

```tsx
/**
 * title: 搜索组件
 * desc: 自定义配置搜索输入框，内部有搜索和重置按钮模板，点击会触发相关事件，通过requestFn事件回调将搜索结果呈现，配和搜索条件字段实现搜索功能。
 */
import { Form, Input, Select, Card, Image, message, Upload } from 'myselfantd';
import React, { useEffect, useState } from 'react';
// import styles from './index.module.scss';
// import { add, getImplementsSpupInfos, getInfoById, update } from '@/api';
interface FormProps {
  data?: any;
  onFinish?: Function;
  handleFinish?: Function;
  viewmode?: 'view' | 'add' | 'edit';
  id?: string;
  close: (...params: any) => void;
}
const App: React.FC<FormProps> = ({
  viewmode = 'add',
  data,
  onFinish: handleFinish,
  id,
  close,
}) => {
  const onGenderChange = (value: string) => {};
  return (
    <Form.Layout
      viewmode={viewmode}
      data={async () => {
        if (id) {
          // let { result } = await getInfoById(id);
          // return result;
          return {}
        }
      }}
      formItemData={[
        [
          {
            name: 'name',
            label: '农具名称',
            rules: [{ required: true, message: '农具名称必填' }],
            render: () => <Input placeholder="请输入" />,
          },
          {
            name: 'deviceSpuId',
            label: '所属品类',
            rules: [{ required: true, message: '所属品类必填' }],
            render: () => (
              <Select
                fieldNames={{ name: 'name', value: 'id' }}
                request={async () => {
                  // let { result } = await getImplementsSpupInfos({ categoryCode: 'all' });
                  // return result;
                  return []
                }}
                placeholder="请选择"
                onChange={onGenderChange}
                allowClear
              />
            ),
            editRender: () => (
              <Select
                disabled
                fieldNames={{ name: 'name', value: 'id' }}
                request={async () => {
                  // let { result } = await getImplementsSpupInfos({ categoryCode: 'all' });
                  // return result;
                  return []
                }}
                placeholder="请选择"
                onChange={onGenderChange}
                allowClear
              />
            ),
          },
        ],
        [
          {
            name: 'code',
            label: '出厂编号',
            rules: [{ required: true, message: '出厂编号必填' }],
            render: () => <Input placeholder="请输入出厂编号" />,
            editRender: () => <Input disabled placeholder="请输入出厂编号" />,
          },
          {
            name: 'widthOfCloth',
            label: '作业幅宽',
            rules: [{ required: true, message: '作业幅宽必填' }],
            render: () => <Input placeholder="请输入品类型号" />,
          },
        ],
        [
          {
            name: 'belongingSystem',
            label: '所属系统',
            rules: [{ required: true, message: '所属系统必填' }],
            render: () => (
              <Select placeholder="请选择" allowClear>
                <Select.Option value="baseinfo" key="baseinfo">
                  设备管理系统
                </Select.Option>
                <Select.Option value="mmc" key="mmc">
                  一控多机
                </Select.Option>
                <Select.Option value="telematics" key="telematics">
                  车联网
                </Select.Option>
              </Select>
            ),
            editRender: () => (
              <Select disabled placeholder="请选择" allowClear>
                <Select.Option value="baseinfo" key="baseinfo">
                  设备管理系统
                </Select.Option>
                <Select.Option value="mmc" key="mmc">
                  一控多机
                </Select.Option>
                <Select.Option value="telematics" key="telematics">
                  车联网
                </Select.Option>
              </Select>
            ),
          },
        ],
        [
          {
            name: 'image',
            label: '农具图片',
            render: () => <Upload urlTemplate={`${'UPLOAD_IMG_URL_NEW'}/hxdfs/{0}`} />,
          },
        ],
        [
          {
            name: 'note',
            label: '说 明',
            render: () => <Input.TextArea placeholder="请填写" />,
          },
        ],
      ]}
      request={async (val: any) => {
        if (viewmode === 'add') {
          // let res = await add(val);
          let res=true
          if (res) {
            message.success('添加成功');
          }
        } else {
          // let res = await update(val);
          let res=true
          if (res) {
            message.success('编辑成功');
          }
        }
      }}
      onFinish={() => close()}
    />
  );
};

export default App;

```
### API

| Name | Description            | Type    | Default |
| ---- | ---------------------- | ------- | ------- |
| type | 屏蔽默认的搜索重置按钮 | boolean | false   |
| onRef | search组件的ref | React.Node | --   |
| columns | 搜索的字段模板 | array | []   |
| requestFn | 搜索的回调函数，供搜索时调用 | function | --   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
