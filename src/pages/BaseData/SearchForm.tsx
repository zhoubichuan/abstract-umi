import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';
const App: React.FC = (props) => {
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    padding: 24,
  };


  const onFinish = (values: any) => {
    props.search(values)
  };

  return (
    <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>

        <Col span={8}>
          <Form.Item label="label" name="label">
            <Input placeholder="请输入label" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="value" name="value">
            <Input placeholder="请输入value" />
          </Form.Item>
        </Col>
      </Row>
      <div style={{ textAlign: 'right' }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> 收起
          </a>
        </Space>
      </div>
    </Form>
  );
};


export default App;