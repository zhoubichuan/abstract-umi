import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import service from "@/services/user"
import { history } from 'umi';
import { Link } from 'umi';
import { Col, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const style: React.CSSProperties = { padding: '8px 0' };
const App: React.FC = () => {
  const onFinish = (values: any) => {
    service.add(values).then((res) => {
      if (res?.code === 0) {
        message.success("注册成功")
        history.push("./user/login")
      } else {
        message.error(res.error)
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="true"
          initialValues={{
            'username': 'admin',
            'password': 'ant.design',
          }}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入你的账号!' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="repassword"
            rules={[{ required: true, message: '请再次输入你的密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>

  );
};

export default App;