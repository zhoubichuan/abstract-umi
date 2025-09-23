/* eslint-disable react/prop-types */
import { Form } from 'antd';
import { Button, Row, Col } from '..';
import { useImperativeHandle, useEffect, useState } from 'react';
import styles from './index.module.scss';
import React, { memo } from 'react';

interface SearchProps {
  type?: any;
  children?: any;
  className?: any;
  columns: any[];
  requestFn?: (...params: any) => void;
  onChange?: Function;
  watch?: string[];
  paramsChange?: (...parmas: any) => void;
  onSearchRef?: any;
  layout?: any;
  defalutValue?: any;
  refreshBtn?: any;
}
const App: React.FC<SearchProps> = memo((props) => {
  let {
    columns = [],
    requestFn,
    type,
    onChange,
    children,
    paramsChange = (val: any) => val,
    onSearchRef,
    layout = { span: 4 },
    defalutValue,
    refreshBtn
  } = props;
  const [form] = Form.useForm();
  const [formItemData, setFormItemData] = useState([] as any);
  useImperativeHandle(onSearchRef, () => {
    return {
      setForm
    };
  });
  useEffect(() => {
    setFormItemData(columns);
  }, [columns]);
  useEffect(() => {
    if (defalutValue) {
      form?.setFieldsValue(defalutValue);
    }
    requestFn?.({}, {});
  }, []);
  const setForm = (data: any) => form?.setFieldsValue(data);
  return (
    <div className={styles.search}>
      <Form
        onFinish={(values: any) => {
          requestFn?.(paramsChange(values), { current: 1 });
        }}
        wrapperCol={{ span: 30, offset: 0 }}
        size="large"
        layout={'inline'}
        form={form}
        initialValues={{ layout: 'inline' }}
        onValuesChange={(changedValues: any, allValues: any) => {
          onChange?.(allValues);
        }}>
        <Row gutter={24} style={{ width: '100%' }}>
          {formItemData.map((item: any, index: number) => {
            return (
              <Col span={layout?.span} key={index}>
                {item.render && (
                  <Form.Item name={item.name} key={item.name}>
                    {/* {() => {
                      const childElement = item.render();
                      let props: any = {
                        key: item.name,
                        search: requestFn
                      };
                      if (childElement.type.displayName === 'Input') {
                        props = {
                          key: item.name,
                          search: requestFn
                        };
                      }
                      return React.cloneElement(childElement, props);
                    }} */}
                    {React.cloneElement(item.render(), {
                      key: item.name
                    })}
                  </Form.Item>
                )}
              </Col>
            );
          })}
          {!type && (
            <>
              <Form.Item>
                <Button.Image type="primary" htmlType="submit" icon={'search'}>
                  查询
                </Button.Image>
              </Form.Item>
              {!refreshBtn && (
                <Form.Item>
                  <Button.Image
                    type="default"
                    onClick={() => {
                      form.resetFields();
                      requestFn?.({}, {});
                    }}
                    icon={'refresh'}>
                    重置
                  </Button.Image>
                </Form.Item>
              )}
            </>
          )}
          {children}
        </Row>
      </Form>
    </div>
  );
});
App.displayName = 'Search';
export default App;
