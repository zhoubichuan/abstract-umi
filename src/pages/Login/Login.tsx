import { Button, Checkbox, Col, Form, Input, message, Radio, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import service from "@/services/user"
import { history } from 'umi';
import { Link } from 'umi';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Login.module.less';

const style: React.CSSProperties = { padding: '8px 0' };
type LoginType = 'username' | 'email';

const App: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('username');

  const accountLabel = useMemo(() => (loginType === 'email' ? '邮箱' : '账号'), [loginType]);

  const accountPlaceholder = useMemo(
    () => (loginType === 'email' ? '请输入邮箱地址' : '请输入你的账号'),
    [loginType],
  );

  const onFinish = (values: any) => {
    const payload =
      loginType === 'email'
        ? { email: values.account, password: values.password }
        : { username: values.account, password: values.password };

    service.login(payload).then((res) => {
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
    <Row align="middle" justify="center" className={styles.page}>
      <Col xs={22} sm={18} md={14} lg={10} xl={8} className={styles.content}>
        <div className={styles.panel}>
          <h2 className={styles.title}>ABSTRACT UMI</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="true"
          initialValues={{
            account: 'admin',
            'password': 'ant.design',
          }}
        >
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Radio.Group
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              optionType="button"
              buttonStyle="solid"
            >
              <Radio.Button value="username">账号登录</Radio.Button>
              <Radio.Button value="email">邮箱登录</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={accountLabel}
            name="account"
            rules={[
              { required: true, message: `请输入你的${accountLabel}!` },
              ...(loginType === 'email' ? [{ type: 'email' as const, message: '请输入正确的邮箱格式!' }] : []),
            ]}
          >
            <Input prefix={loginType === 'email' ? <MailOutlined /> : <UserOutlined />} placeholder={accountPlaceholder} />
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
        </div>
      </Col>
    </Row>

  );
};

export default App;