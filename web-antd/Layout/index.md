---
title: Layout
nav:
  path: /components
---

## Layout

```tsx
import { Layout } from 'myselfantd'
import React from 'react'

const { Header, Footer, Sider, Content } = Layout
let style = {
  position: 'relative',
  zIndex: '1000',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%'
}
const App: React.FC = () => (
  <div style={style}>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </div>
)

export default App
```

## Layout.PageTemplate

```tsx
import { Layout, Button, Space, message, Drawer, Input, Modal, Select } from 'myselfantd';
import React, { useState } from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
// import {
//   getOrganizition,
//   getModel,
//   getType,
// } from '@/services/api/EquipmentManage';

interface DataType {
  code: number;
  work: string;
  operateArea: number;
  operateDistance: number;
  taskEndTime: string;
  taskStatus: number;
  evaluationState: number;
  option: [];
}
const App: React.FC = () => {
  const handleContinue = async (_: any, state: string) => {
    setCurState([true, state, _.id]);
  };
  const [curState, setCurState] = useState([false, 'view', ''] as [boolean, string, string]);
  const handleAdd = () => {
    setCurState([true, 'create', '']);
  };
  const onClose = () => {
    setCurState([false, 'edit', '']);
  };
  return (
    <div style={{height:'calc(100vh - 200px)'}}>
      <Layout.PageTemplate
        title="农机管理"
        search={{
          template: [
            {
              name: 'categoryId',
              render: () => (
                <Select
                  fieldNames={{ name: 'categoryName', value: 'categoryId' }}
                  request={async () => {
                    // let { result } = await getType();
                    return [{categoryName:"阿斯顿发",categoryId:122222}];
                  }}
                  placeholder="请选择农机类型"
                  allowClear
                />
              ),
            },
            {
              name: 'type',
              render: () => (
                <Select
                  fieldNames={{ name: 'name', value: 'id' }}
                  request={async () => {
                    // let { result } = await getModel();
                    return [{ name: '123', id: '123' }]
                  }}
                  placeholder="规格型号"
                  allowClear
                />
              ),
            },
            {
              name: 'belongCompany',
              render: () => (
                <Select
                  fieldNames={{ name: 'companyName', value: 'companyCode' }}
                  request={async () => {
                    // let { result } = await getOrganizition();
                    return [{companyName:"asdfasd",companyCode:"123"}];
                  }}
                  placeholder="所属单位"
                  allowClear
                />
              ),
            },
            {
              name: 'conditions',
              render: () => <Input placeholder="请输入农机编号/车架号" />,
            },
          ],
          button: [
            <Button.Image type="primary" htmlType="submit" icon={'add'} onClick={handleAdd}>
              添加农机
            </Button.Image>,
          ],
        }}
        table={{
          template: [
            {
              title: '序号',
              width: 150,
              fixed: 'left',
              align: 'left',
              render: (text, record, index) => {
                return index + 1;
              },
            },
            // {
            //   title: '农具编号',
            //   width: 150,
            //   textWrap: 'word-break',
            //   align: 'left',
            //   dataIndex: 'code',
            // },
            {
              title: '车架号',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'name',
            },
            {
              title: '农机名称',
              width: 120,
              textWrap: 'word-break',
              ellipsis: true,
              align: 'left',
              dataIndex: 'categoryName',
            },
            {
              title: '农机类型',
              width: 100,
              dataIndex: 'createTime',
              key: 'createTime',
            },
            // {
            //   title: '所属片区',
            //   width: 100,
            //   textWrap: 'word-break',
            //   align: 'left',
            //   dataIndex: 'updateTime',
            // },
            {
              title: '设备厂商',
              width: 100,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'equipmentModel',
            },
            // {
            //   title: '农机型号',
            //   width: 100,
            //   textWrap: 'word-break',
            //   align: 'left',
            //   dataIndex: 'suspensionName',
            // },
            {
              title: '所属单位',
              width: 100,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'widthOfCloth',
            },
            {
              title: '操作',
              width: 240,
              render: (_, record) => (
                <Space size="middle">
                  <Button type="link" block onClick={() => handleContinue(_, 'view')}>
                    查看
                  </Button>
                  <Button
                    type="link"
                    block
                    onClick={() => {
                      Modal.confirm({
                        content: `是否确认删除【${_.code}】的数据信息？`,
                        onOk() {
                          // delMachine(_.id).then((res: any) => {
                          //   console.log(res);
                            message.success('删除成功');
                          // });
                        },
                        onCancel() {
                          Modal.destroyAll();
                        },
                      });
                    }}
                  >
                    删除
                  </Button>
                </Space>
              ),
            },
          ] as ColumnsType<DataType>,
          data: {
            data: [] as ColumnsType<DataType>,
            page: { total: 0, pageSize: 20, current: 1 },
          },
        }}
        request={async (page: any, params: any, callback: Function) => {
          let { curPage, pageSize, ...restParams } = params;
          let defaultParams: any = {
            pageIndex: curPage || page.current,
            pageSize: pageSize || page.pageSize,
          };

          params = { ...defaultParams, ...restParams };
          // let {
          //   result: { data, pageIndex, pageSize: newPageSize, total },
          // } = await getMachinePage(params);
          return {
            data:[{name:1}],
            page: { total:1, pageSize: 10, current: 1 },
          };
        }}
      />
    </div>
  );
};

export default App;

```

## Layout.TabsTemplate

```tsx
import {
  Button,
  Layout,
  Space,
  Badge,
  message,
  Descriptions,
  Modal
} from 'myselfantd'
import React, { useState } from 'react'
// import AlarmRecord from './AlarmRecord';
// import FaultRecord from './FaultRecord';
interface DataType {
  code: number
  work: string
  operateArea: number
  operateDistance: number
  taskEndTime: string
  taskStatus: number
  evaluationState: number
  option: []
}

const AlarmRecord = (props: any) => {
  const handleContinue = async (_: any) => {}
  return (
    <>
      <Layout.PageContent
        search={false}
        table={{
          template: [
            {
              title: '序号',
              width: 50,
              textWrap: 'word-break',
              fixed: 'left',
              align: 'left',
              render: (text: any, record: any, index: any) => {
                return index + 1
              }
            },
            {
              title: '围栏名称',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'railName'
            },
            {
              title: '设置地点',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'railArea'
            },
            {
              title: '报警条件',
              width: 120,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'warningTypeName'
            },
            {
              title: '报警时间',
              width: 120,
              textWrap: 'word-break',
              ellipsis: true,
              align: 'left',
              dataIndex: 'warningTime'
            },
            {
              title: '修改时间',
              width: 100,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'updateTime'
            },
            {
              title: '备注',
              width: 140,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'remark'
            },
            {
              title: '操作',
              width: 240,
              render: (_, record) => (
                <Space size="middle">
                  <Button
                    type="link"
                    block
                    onClick={() => handleContinue(false, _)}
                  >
                    修改
                  </Button>
                  <Button
                    type="link"
                    block
                    onClick={() => handleContinue(false, _)}
                  >
                    删除
                  </Button>
                </Space>
              )
            }
          ] as ColumnsType<DataType>,
          data: {
            data: [] as ColumnsType<DataType>,
            page: { total: 0, pageSize: 20, pageIndex: 1 }
          }
        }}
        request={async (page: any, params: any, callback: Function) => {
          let { curPage, pageSize, ...restParams } = params
          let defaultParams: any = {
            pageIndex: curPage || page.current,
            pageSize: pageSize || page.pageSize
          }

          params = { ...defaultParams, ...restParams }
          // let {
          //   result: { data, pageIndex, pageSize: newPageSize, total },
          // } = await getMachinePage(params);
          return {
            data: [{ name: 1 }],
            page: { total: 1, pageSize: 10, current: 1 }
          }
        }}
      />
    </>
  )
}
interface DataType {
  code: number
  work: string
  operateArea: number
  operateDistance: number
  taskEndTime: string
  taskStatus: number
  evaluationState: number
  option: []
}

const FaultRecord = (props: any) => {
  const handleContinue = async (_: any) => {}
  return (
    <>
      <Layout.PageContent
        search={false}
        table={{
          template: [
            {
              title: '序号',
              width: 50,
              fixed: 'left',
              align: 'left',
              render: (text, record, index) => {
                return index + 1
              }
            },
            {
              title: '农机型号',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'machineModel'
            },
            {
              title: '农机类型',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'machineCategoryName'
            },
            {
              title: '农机数量（台）',
              width: 120,
              textWrap: 'word-break',
              ellipsis: true,
              align: 'left',
              dataIndex: 'machineNumb'
            },
            {
              title: '设置工况类型',
              width: 100,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'operatingConditionType'
            },
            {
              title: '可设置工况阈值',
              width: 140,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'threshold'
            },
            {
              title: '当前设置阈值数',
              textWrap: 'word-break',
              width: 150,
              align: 'left',
              dataIndex: 'realNumb'
            },
            {
              title: '修改时间',
              width: 100,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'updateTime'
            },
            {
              title: '操作',
              width: 240,
              render: (_, record) => (
                <Space size="middle">
                  <Button
                    type="link"
                    block
                    onClick={() => handleContinue(false, _)}
                  >
                    修改
                  </Button>
                  <Button
                    type="link"
                    block
                    onClick={() => handleContinue(false, _)}
                  >
                    删除
                  </Button>
                </Space>
              )
            }
          ] as ColumnsType<DataType>,
          data: {
            data: [] as ColumnsType<DataType>,
            page: { total: 0, pageSize: 20, pageIndex: 1 }
          }
        }}
        request={async (page: any, params: any, callback: Function) => {
          let { curPage, pageSize, ...restParams } = params
          let defaultParams: any = {
            pageIndex: curPage || page.current,
            pageSize: pageSize || page.pageSize
          }

          params = { ...defaultParams, ...restParams }
          // let {
          //   result: { data, pageIndex, pageSize: newPageSize, total },
          // } = await getMachinePage(params);
          return {
            data: [{ name: 1 }],
            page: { total: 1, pageSize: 10, current: 1 }
          }
        }}
      />
    </>
  )
}
const App: React.FC = () => {
  const [key, setKey] = useState('0')
  const [isShow, setVisible] = useState(false)
  return (
    <div style={{ height: 'calc(100vh - 200px)' }}>
      <Layout.TabsTemplate
        targetKey={key}
        keyChnage={(key: any) => setKey(key)}
        tabBarExtraContent={
          <Button.Image
            size="large"
            style={{ position: 'absolute', right: '10px', top: '10px' }}
            type="primary"
            onClick={() => setVisible(true)}
            icon={'add'}
          >
            {key.includes('0') ? '新增围栏' : '新增阈值'}
          </Button.Image>
        }
      >
        <AlarmRecord
          title="围栏设置"
          showDialog={isShow}
          stateChange={(val: boolean) => setVisible(val)}
        />
        <FaultRecord
          title="阈值设置"
          showDialog={isShow}
          stateChange={(val: boolean) => setVisible(val)}
        />
      </Layout.TabsTemplate>
    </div>
  )
}

export default App
```

## Static

```ts
import { Layout, Button, Space, Modal, message } from 'myselfantd';
import React, { useState, useEffect, lazy } from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import StaticContent from './StaticContent';
import styles from './index.module.scss';

interface DataType {
  code: number;
  work: string;
  operateArea: number;
  operateDistance: number;
  taskEndTime: string;
  taskStatus: number;
  evaluationState: number;
  option: [];
}
type TYPE = 'view' | 'add' | 'edit';
interface Props {
  viewmode?: TYPE;
  data?: any;
  onChange?: Function;
}
const App: React.FC<Props> = (props) => {
  let { viewmode, data, onChange } = props;
  const [tableData, setTableData] = useState({
    data: [] as ColumnsType<DataType>,
    page: { total: 0, pageSize: 10, current: 1 },
  } as any);
  const [editData, setEditData] = useState<any>([]);
  useEffect(() => {
    if (data) {
      setTableData({
        data: data as ColumnsType<DataType>,
        page: { total: data.length, pageSize: 10, current: 1 },
      });
    }
  }, [data]);

  const [curState, setCurState] = useState([false, 'view'] as [boolean, TYPE]);
  return (
    <>
      <Layout.PageTemplate
        padding={0}
        height={0}
        title="静态参数"
        tabBarExtraContent={
          viewmode === 'add' && (
            <Button.Image
              size="large"
              style={{ position: 'absolute', right: '10px', top: '10px' }}
              type="primary"
              onClick={() => setCurState([true, 'add'])}
              icon={'add'}
            >
              添加参数
            </Button.Image>
          )
        }
        search={false}
        table={{
          template: [
            {
              title: '序号',
              width: 150,
              fixed: 'left',
              align: 'left',
              render: (text, record, index) => {
                return index + 1;
              },
            },
            {
              title: '参数名称',
              width: 150,
              fixed: 'left',
              align: 'left',
              dataIndex: 'name',
            },
            {
              title: '参数编号',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'code',
            },
            {
              title: '参数值',
              width: 150,
              textWrap: 'word-break',
              align: 'left',
              dataIndex: 'value',
            },
            {
              title: '参数单位',
              width: 120,
              textWrap: 'word-break',
              ellipsis: true,
              align: 'left',
              dataIndex: 'unitId',
            },
            viewmode !== 'view' && {
              title: '操作',
              width: 240,
              render: (_, record, index) => (
                <Space size="middle">
                  <Button
                    type="link"
                    block
                    onClick={() => {
                      setEditData([{ ..._, sortKey: index + 1, key: index + 1 }]);
                      setCurState([true, 'edit']);
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    block
                    onClick={() => {
                      let data = tableData.data;
                      data.splice(index, 1);
                      setTableData({
                        data: data as ColumnsType<DataType>,
                        page: { total: data.length, pageSize: 10, current: 1 },
                      });
                      message.info('删除静态属性成功');
                    }}
                  >
                    删除
                  </Button>
                </Space>
              ),
            },
          ] as ColumnsType<DataType>,
          data: tableData,
          attrs: {
            y: 200,
          },
        }}
      />
      {viewmode !== 'view' && (
        <Modal.Dialog
          showDialog={curState[0]}
          changeDialog={(val: boolean) => setCurState([val, 'view'])}
          size={'middle'}
        >
          <StaticContent
            viewmode={curState[1]}
            onFinish={(val: any[]) => {
              let data = [];
              if (viewmode === 'add') {
                data = [...tableData.data, ...val];
              } else {
                for (let i = 0; i < tableData.data.length; i++) {
                  for (let j = 0; j < val.length; j++) {
                    if (tableData.data[i].id === val[j].id) {
                      data.push(val[j]);
                    } else {
                      data.push(tableData.data[i]);
                    }
                  }
                }
              }
              onChange && onChange(data);
              setTableData({
                data: [...data] as ColumnsType<DataType>,
                page: { total: data.length, pageSize: 10, current: 1 },
              });
              setCurState([false, curState[1]]);
            }}
            data={editData}
          />
        </Modal.Dialog>
      )}
    </>
  );
};

export default App;
```

## StaticContent

```ts
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState, useEffect } from 'react';
import { Table, Button, Input, Row } from 'myselfantd';
interface DataType {
  code: number;
  name: string;
  type: string;
  value: number;
  unit: number;
  duration: number;
  remark: string;
  editable: boolean;
}
interface Props {
  data?: any;
  type?: any;
  title?: any;
  onFinish: Function;
  viewmode?: 'view' | 'add' | 'edit';
}
const App = (props: Props) => {
  let { data, type, title, onFinish, viewmode } = props;
  const [fields, setFields] = useState(data);
  const handleOnChange = (val: any) => {
    const newData = fields;
    newData.forEach((item: any, index: any) => {
      if (val.sortkey === item.sortkey) {
        newData[index] = val;
      }
    });
    setFields([...newData]);
  };
  return (
    <>
      <div style={{ height: '30px', position: 'relative' }}>
        <h2>静态属性</h2>
      </div>
      <Table.Edit
        data={fields}
        page={{ total: 0, pageSize: 20, current: 1 }}
        columns={[
          {
            title: '序号',
            dataIndex: 'sortkey',
          },
          {
            title: '参数名称',
            dataIndex: 'name',
            showSorterTooltip: false,
            onCell: (record: DataType) => {
              return {
                editable: true,
                filed: 'name',
                record,
                rules: [
                  {
                    required: true,
                    message: `参数名称必填`,
                  },
                ],
                onChange: handleOnChange,
              };
            },
          },
          {
            title: '参数编号',
            dataIndex: 'code',
            showSorterTooltip: false,
            width: 180,
            onCell: (record: DataType) => ({
              editable: true,
              filed: 'code',
              record,
              rules: [
                {
                  required: true,
                  message: `参数编号必填`,
                },
              ],
              onChange: handleOnChange,
            }),
          },
          {
            title: '参数值',
            dataIndex: 'value',
            showSorterTooltip: false,
            width: 180,
            onCell: (record: DataType) => ({
              editable: true,
              filed: 'value',
              record,
              rules: [
                {
                  required: true,
                  message: `参数值必填`,
                },
              ],
              onChange: handleOnChange,
            }),
          },
          {
            title: '参数单位',
            dataIndex: 'unitId',
            showSorterTooltip: false,
            onCell: (record: DataType) => ({
              editable: true,
              filed: 'unitId',
              record,
              rules: [
                {
                  required: true,
                  message: `参数单位必填`,
                },
              ],
              onChange: handleOnChange,
            }),
          },
          {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record: { key: React.Key }) => (
              <Button
                type="link"
                onClick={() => {
                  const newData = fields.filter((item: any) => item.key !== record.key);
                  setFields([...newData]);
                }}
              >
                删除
              </Button>
            ),
          },
        ]}
        createRowData={
          viewmode === 'add'
            ? (val: any) => {
                let count = 0;
                if (fields.length) {
                  count = fields[fields.length - 1].sortkey;
                }
                const newData: Array<DataType> = [
                  ...fields,
                  {
                    sortkey: count + 1,
                    key: count + 1,
                  },
                ];
                setFields(newData);
              }
            : false
        }
      />
      <Row justify="end">
        <Button
          type="primary"
          onClick={() => {
            onFinish(fields);
          }}
          style={{ marginRight: '20px' }}
        >
          保存
        </Button>
        <Button type="default" onClick={() => {}}>
          取消
        </Button>
      </Row>
    </>
  );
};

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
