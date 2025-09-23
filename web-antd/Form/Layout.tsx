import { Button, Form } from '..';
import { Row, Col } from 'antd';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
const layout = {
  name: 'wrap',
  labelCol: { flex: '118px' },
  colon: false,
  wrapperCol: { flex: 1 },
  autoComplete: 'off',
  labelWrap: true,
  labelAlign: 'right',
};
interface LayoutProps {
  formItemData: any;
  mapPoint?: string;
  data?: Function | object;
  onFinish?: Function;
  children?: any;
  onRef?: any;
  request?: any;
  viewmode?: 'view' | 'add' | 'edit';
  title?: any;
  className?: string;
  paramsChange?: (...parmas: any) => void;
}
const App: React.FC<LayoutProps> = (props) => {
  const {
    viewmode,
    formItemData,
    onFinish: handleFinish,
    children,
    request,
    data = {},
    title,
    className,
    paramsChange = (val: any) => val,
  } = props;
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const initData = async () => {
    if (typeof data === 'function') {
      let result = await data();
      setFormData(result);
      form.setFieldsValue(result);
    } else {
      setFormData(data);
      form.setFieldsValue(data);
    }
  };
  useEffect(() => {
    initData();
  }, [data]);
  const onReset = () => {
    form.resetFields();
    handleFinish?.(false);
  };
  const classname = classnames(styles.layout, className);
  return (
    <Form
      {...layout}
      form={form}
      onFinish={async (values: any) => {
        request?.(paramsChange(values));
      }}
      className={classname}
      onChange={(val: any) => {
        console.log(val, '---layout-value---');
      }}
    >
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {formItemData.map((item: any, index: number) => {
          return (
            <Row key={index} gutter={50}>
              {item.map((i: any, childIndex: number) => {
                let { render, viewRender, editRender, ...rest } = i;
                let span = 24 / item.length;
                let content: any;
                let value = i.shouldUpdate ? form.getFieldValue(i.name) : form.getFieldsValue();
                if (viewmode === 'view') {
                  rest.rules = null;
                  content = viewRender ? viewRender(formData[i.name], value) : <Form.Text />;
                } else if (viewmode === 'edit') {
                  content = editRender
                    ? editRender(formData[i.name], value)
                    : render(formData[i.name], value);
                } else {
                  content = render ? render(formData[i.name], value) : <Form.Text />;
                }
                return (
                  <Col key={childIndex} span={span}>
                    <Form.Item {...rest}>{content}</Form.Item>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
      {React.Children.map(children, (child, i) => {
        const childElement = child as React.FunctionComponentElement<any>;
        return React.cloneElement(childElement, {
          key: i,
        });
      })}
      {request && viewmode !== 'view' && (
        <Row justify="end">
          <Button size="large" htmlType="button" onClick={onReset}>
            取消
          </Button>
          <Button size="large" type="primary" htmlType="submit" style={{ margin: '0 0 0 20px' }}>
            保存
          </Button>
        </Row>
      )}
    </Form>
  );
};
export default App;
