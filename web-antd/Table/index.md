---
title: Table
nav:
  path: /components
---

## Table

```tsx
import { Space, Table, Tag } from 'myselfantd'
import React from 'react'

const { Column, ColumnGroup } = Table

interface DataType {
  key: React.Key
  firstName: string
  lastName: string
  age: number
  address: string
  tags: string[]
}

const data: DataType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

const App: React.FC = () => (
  <Table dataSource={data}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_: any, record: DataType) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
)

export default App
```

## Table.Pagination

```tsx
/**
 * title: 介绍
 * desc: 将Table和pagination放在一起进行封装，内部会自动处理好分页相关逻辑，对外暴露onChange已响应分页参数修改
 */
import { Button, Space, Table, Modal } from 'myselfantd'
import React, { useState, useEffect, useRef } from 'react'

const App: React.FC = () => {
  const ref = useRef<any>()
  const [tableData, setTableData] = useState<any>({
    data: [],
    page: { total: 0, pageSize: 20, current: 1 }
  })
  useEffect(() => {
    setTableData({
      data: [{ a: 1, b: 2, c: 3 }],
      page: { total: 1, pageSize: 20, current: 1 }
    })
    ref.current.setLoading(false)
  }, [])
  const requestFn = async (...params: any) => {}
  return (
    <Table.Pagination
      onTableRef={ref}
      tableData={tableData}
      columns={[
        {
          title: '号码',
          dataIndex: 'name'
        },
        {
          title: '信息',
          dataIndex: 'a',
          sorter: {
            compare: (a, b) => a.a - b.a,
            multiple: 3
          },
          showSorterTooltip: false
        },
        {
          title: '名称',
          dataIndex: 'b',
          sorter: {
            compare: (a, b) => a.b - b.b,
            multiple: 2
          },
          showSorterTooltip: false,
          width: 180
        },
        {
          title: '年龄',
          dataIndex: 'c',
          sorter: {
            compare: (a, b) => a.c - b.c,
            multiple: 1
          },
          showSorterTooltip: false,
          width: 180
        },
        {
          title: '时间',
          dataIndex: 'd',
          sorter: {
            compare: (a, b) => a.d - b.d,
            multiple: 1
          },
          showSorterTooltip: false,
          width: 150
        },
        {
          title: '其他',
          dataIndex: 'e',
          sorter: {
            compare: (a, b) => a.e - b.e,
            multiple: 1
          },
          showSorterTooltip: false,
          width: 150
        },
        {
          title: '备注',
          dataIndex: 'f',
          sorter: {
            compare: (a, b) => a.f - b.f,
            multiple: 1
          },
          showSorterTooltip: false,
          width: 150
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Button type="link" block onClick={() => {}}>
                打开
              </Button>
              <Button type="link" block>
                继续
              </Button>
              <Button type="link" block>
                详情
              </Button>
            </Space>
          )
        }
      ]}
      onChange={(pagination, filters, sorter, extra) => {
        requestFn({
          pageIndex: pagination.current,
          pageSize: pagination.pageSize
        })
        console.log('params', pagination, filters, sorter, extra)
      }}
    />
  )
}
export default App
```

## Table.Edit

```tsx
/**
 * title: 介绍
 * desc: 将Table和form放在一起进行封装，会组合成一个可编辑表格
 */
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
  let { data=[], type, title, onFinish, viewmode='add' } = props;
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
      <Table.Edit
        value={fields}
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
            console.log(fields, '----------fields------');
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
