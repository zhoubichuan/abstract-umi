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
    service.login(values).then((res) => {
      if (res?.code === 0) {
        sessionStorage.setItem("username", res.data.username)
        message.success("登陆成功")
        history.push("/home")
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

          <Form.Item valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div style={style}><Checkbox>记住我</Checkbox> </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}><Link to={'/user/register'}>注册账号</Link></div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}><Link to={'/user/forget'}>忘记密码</Link></div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}><Link to={'/user/edit'}>修改密码</Link></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>

  );
};

export default App;