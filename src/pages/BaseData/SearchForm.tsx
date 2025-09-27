import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, DatePicker } from 'antd';
const { RangePicker } = DatePicker
const { Option } = Select;

const getDate = (date, dateString) => {
}
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
          <Form.Item label="中文名称" name="name">
            <Input placeholder="请输入英文名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="英文名称" name="nameEn">
            <Input placeholder="请输入英文名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="分类" name="category">
            <Select placeholder="请选择分类">
              {[].map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="创建者" name="creater">
            <Input placeholder="请输入创建者" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="创建时间" name="creatTime">
            <RangePicker onChange={getDate} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="更新者" name="updater">
            <Input placeholder="请输入更新者" />
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