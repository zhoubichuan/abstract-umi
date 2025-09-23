import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './index.module.scss';
import _ from 'lodash';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
  render?: any;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item, dataIndex: string) => void;
  columnsField: Array<any>;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  columnsField,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    // if (editing) {
    //     inputRef.current!.focus();
    // }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      console.log({ ...record, ...values }, 'row-----');
      handleSave({ ...record, ...values }, dataIndex);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode: any = children;
  if (editable) {
    let rowItem: any = columnsField.find((i: any) => i.name === dataIndex) || {};
    if (editing) {
      childNode =
        rowItem.type === undefined ? (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `${title} 必填`
              }
            ]}
          >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        ) : (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `${title} 必选`
              }
            ]}
          >
            <Select placeholder={rowItem.placeholder} style={{ width: '100%' }} onChange={save}>
              {rowItem.options.map((option: any) => (
                <Select.Option value={option.value} key={option.name}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
    } else {
      if (rowItem.type === 'select') {
        children = rowItem.options.find((item: any) => [...childNode][1] === item.value)?.name;
      }
      childNode = (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }
  }
  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key?: any;
  sortkey: any;
  code?: number;
  name: string;
  unit: string;
  type: string;
  value: number;
  duration: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
interface tableProps {
  onChange?: any;
  columns?: any;
  className?: any;
  y?: number;
  components?: any;
  data?: any;
  page?: any;
  columnsField?: Array<any>;
}
const App = ({ columns, onChange, data = [], page, columnsField }: any) => {
  let targetCode = columnsField?.find((item: any) => item.name === 'code');
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  useEffect(() => {
    setDataSource(
      [...dataSource, ...data].map((i: any, index: any) => ({
        key: index + 1,
        sortkey: index + 1,
        ...i
      }))
    );
    setCount(data.length + 1);
    onChange(data);
  }, [data]);
  const [count, setCount] = useState(1);
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    onChange(
      newData.map((i) => {
        let { key, sortkey, ...rest } = i;
        return rest;
      })
    );
  };
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    ...columns,
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record.key)}>
            <Button type="link">删除</Button>
          </Popconfirm>
        ) : null
    }
  ];

  const handleAdd = (val: any) => {
    let target = targetCode.options[0];
    const newData: Array<DataType> = [
      ...dataSource,
      {
        key: count,
        sortkey: count,
        code: target.value,
        name: target.name,
        unit: target.unit,
        type: columnsField?.find((item: any) => item.name === 'type').options[0].value,
        value: 1,
        duration: '1'
      }
    ];
    setDataSource(newData);
    setCount(count + 1);
    onChange(
      newData.map((i) => {
        let { key, sortkey, ...rest } = i;
        return rest;
      })
    );
  };

  const column = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => {
        return {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: (row: DataType, dataIndex: string) => {
            const newData = [...dataSource];
            const index = newData.findIndex((item) => row.key === item.key);
            const item = newData[index];
            if (dataIndex.includes('code')) {
              row.name = targetCode.options.find((item: any) => item.value === row.code)?.name;
              row.unit = targetCode.options.find((item: any) => item.value === row.code)?.unit;
            }
            console.log(targetCode, row, 'row-----');
            newData.splice(index, 1, {
              ...item,
              ...row
            });
            setDataSource(newData);
            onChange(
              newData.map((i) => {
                let { key, sortkey, ...rest } = i;
                return rest;
              })
            );
          },
          columnsField
        };
      }
    };
  });

  return (
    <div className="myantd " style={{ marginTop: '20px' }}>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={column as ColumnTypes}
      />
      <Button
        type="dashed"
        disabled={!columnsField?.length}
        onClick={handleAdd}
        style={{
          display: 'block',
          margin: '10px 0',
          width: '100%'
        }}
        icon={<PlusOutlined />}
      >
        {'添加一行数据'}
      </Button>
    </div>
  );
};

export default App;
