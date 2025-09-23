import { Form, Input, Table, Space, Button, message } from 'antd';
import React, { useState, useEffect, memo } from 'react';
import { PlusOutlined } from '@ant-design/icons';

interface Item {
  sortkey: string;
  name: string;
  age: number;
  address: string;
}
interface tableProps {
  onChange?: any;
  value?: any;
  defaultValue?: any;
  columns?: any;
  className?: any;
  y?: number;
  components?: any;
  page?: any;
  createRowData?: () => void;
  singleOnChnage?: (...params: any) => void;
  deleteButton?: boolean;
}
const App: React.FC<tableProps> = memo((props) => {
  let {
    columns,
    createRowData,
    deleteButton = true,
    onChange,
    defaultValue,
    value,
    singleOnChnage,
    ...restProps
  } = props;
  const [dataSource, setDataSource] = useState<any>(value);
  const handleSetDataSource = (val: any) => {
    onChange?.(val);
    setDataSource(val);
  };
  useEffect(() => {
    handleSetDataSource(value);
  }, [value]);
  useEffect(() => {
    if (defaultValue) {
      handleSetDataSource(defaultValue);
    }
  }, []);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<any>('');

  const isEditing = (record: Item) => record.sortkey === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.sortkey);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (sortkey: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => sortkey === item.sortkey);
      if (index > -1) {
        const item = newData[index];
        singleOnChnage?.({
          ...item,
          ...row
        });
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        handleSetDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        handleSetDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: ({
                children,
                filed,
                record,
                editable,
                rules,
                onChange,
                render,
                viewRender,
                ...restProps
              }: any) => {
                let childNode: any = children;
                if (editable && record.sortkey === editingKey) {
                  if (render) {
                    childNode = (
                      <Form.Item style={{ margin: 0 }} name={filed} rules={rules}>
                        {render()}
                      </Form.Item>
                    );
                  } else {
                    childNode = (
                      <Form.Item style={{ margin: 0 }} name={filed} rules={rules}>
                        <Input />
                      </Form.Item>
                    );
                  }
                } else {
                  if (viewRender) {
                    childNode = viewRender(record[filed], record);
                  } else {
                    childNode = <div style={{ paddingRight: 24 }}>{children}</div>;
                  }
                }
                return <td {...restProps}>{childNode}</td>;
              }
            }
          }}
          bordered={false}
          dataSource={dataSource}
          columns={[
            ...columns,
            {
              title: '操作',
              dataIndex: 'operation',
              render: (_: any, record: any) => {
                const editable = isEditing(record);
                return (
                  <Space size="middle">
                    {editable ? (
                      <Button
                        type="link"
                        onClick={() => save(record.sortkey)}
                        style={{ marginRight: 8 }}>
                        保存
                      </Button>
                    ) : (
                      <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>
                        编辑
                      </Button>
                    )}
                    {createRowData && (
                      <Button
                        type="link"
                        onClick={() => {
                          const newData = dataSource.filter(
                            (item: any) => item.sortkey !== record.sortkey
                          );
                          handleSetDataSource([...newData]);
                        }}
                        style={{ marginRight: 8 }}>
                        删除
                      </Button>
                    )}
                  </Space>
                );
              }
            }
          ]}
          pagination={{
            onChange: cancel
          }}
        />
        {createRowData && (
          <Button
            type="dashed"
            // disabled={!columnsField?.length}
            onClick={() => {
              if (editingKey) {
                return message.info('请先保存内容');
              }
              let count = 0;
              if (dataSource.length) {
                count = dataSource[dataSource.length - 1].sortkey;
              }
              let targetData: any = createRowData?.();
              const newData: Array<any> = [
                ...dataSource,
                {
                  sortkey: count + 1,
                  ...targetData
                }
              ];
              handleSetDataSource([...newData]);
              edit({
                sortkey: count + 1,
                ...targetData
              });
            }}
            style={{
              display: 'block',
              margin: '10px 0',
              width: '100%'
            }}
            icon={<PlusOutlined />}>
            {'添加一行数据'}
          </Button>
        )}
      </Form>
    </div>
  );
});
App.displayName = 'tableForm';
export default App;
