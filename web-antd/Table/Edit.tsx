/* eslint-disable react-hooks/rules-of-hooks */
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState, memo, createContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import _ from 'lodash';

const EditableContext = createContext<any>(null);

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

  return (
    <div style={{ marginTop: '20px' }}>
      <Table
        rowKey={(record: any, index: any) => index}
        components={{
          body: {
            row: (props: any) => {
              const [form] = Form.useForm();
              // form.setFieldsValue(data);
              return (
                <Form form={form} component={false}>
                  <EditableContext.Provider value={{ form, dataSource, handleSetDataSource }}>
                    <tr {...props} />
                  </EditableContext.Provider>
                </Form>
              );
            },
            cell: ({ children, filed, record, editable, rules, onChange, render }: any) => {
              const [editing, setEditing] = useState(false);
              const inputRef = useRef<InputRef>(null);
              const { form, dataSource, handleSetDataSource } = useContext(EditableContext)!;
              useEffect(() => {
                if (editing) {
                  inputRef.current?.focus();
                }
              }, [editing]);
              const toggleEdit = () => {
                setEditing(!editing);
                console.log(filed, record[filed]);
                form.setFieldsValue({ [filed]: record[filed] });
              };
              const handleSave = async () => {
                try {
                  const values = await form.validateFields();
                  const newData = dataSource;
                  newData.forEach((item: any, index: any) => {
                    if (record.sortkey === item.sortkey) {
                      newData[index] = { ...record, ...values };
                    }
                  });
                  handleSetDataSource([...newData]);
                  onChange?.({ ...record, ...values }, dataSource);
                  toggleEdit();
                  console.log('haneldSave-----:');
                } catch (errInfo) {
                  console.log('Save failed:', errInfo);
                }
              };
              let childNode: any = children;
              if (editable) {
                if (editing || !record[filed]) {
                  if (render) {
                    childNode = (
                      <Form.Item style={{ margin: 0 }} name={filed} rules={rules}>
                        {render()}
                      </Form.Item>
                    );
                  } else {
                    childNode = (
                      <Form.Item style={{ margin: 0 }} name={filed} rules={rules}>
                        <Input
                          ref={inputRef}
                          onPressEnter={handleSave}
                          onBlur={handleSave}
                          onMouseLeave={handleSave}
                        />
                      </Form.Item>
                    );
                  }
                } else {
                  childNode = (
                    <div style={{ paddingRight: 24 }} onClick={toggleEdit}>
                      {children}
                    </div>
                  );
                }
              } else {
                childNode = <div style={{ paddingRight: 24 }}>{children}</div>;
              }
              return <td>{childNode}</td>;
            }
          }
        }}
        bordered={false}
        dataSource={dataSource}
        columns={
          deleteButton
            ? [
                ...columns,
                {
                  title: '操作',
                  dataIndex: 'operation',
                  render: (_: any, record: { sortkey: React.Key }) => (
                    <Button
                      type="link"
                      onClick={() => {
                        const newData = dataSource.filter(
                          (item: any) => item.sortkey !== record.sortkey
                        );
                        handleSetDataSource([...newData]);
                      }}>
                      删除
                    </Button>
                  )
                }
              ]
            : [...columns]
        }
        {...restProps}
      />
      {createRowData && (
        <Button
          type="dashed"
          // disabled={!columnsField?.length}
          onClick={() => {
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
    </div>
  );
});
App.displayName = 'tableEdit';
export default App;
