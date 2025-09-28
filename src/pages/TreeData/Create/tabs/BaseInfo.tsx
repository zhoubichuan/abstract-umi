

import React, { useState, Fragment } from 'react';
import { DownOutlined } from '@ant-design/icons';
import treeDataService from '@/services/treedata';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { Collapse, Button, Col, Form, Input, Row, Select, Space, DatePicker, Radio, message } from 'antd';
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


    const onFinish = async (values: any) => {
        let res = await treeDataService.add(values)
        if (res?.code === 0) {
            message.success("添加成功")
        } else {
            message.error(res.error)
        }
    };

    const options: CheckboxGroupProps<string>['options'] = [
        { label: '是', value: true },
        { label: '否', value: false },
    ];
    return (
        <Fragment>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                <Collapse defaultActiveKey={['1', '2']} style={{ width: '100%' }}>
                    <Collapse.Panel header="基本信息" key="1">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="label" name="label" rules={[{ required: true }]}>
                                    <Input placeholder="请输入英文名称" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="value" name="value" rules={[{ required: true }]}>
                                    <Input placeholder="请输入英文名称" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="url" name="url" rules={[{ required: true }]}>
                                    <Input placeholder="请输入英文名称" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="level" name="level" rules={[{ required: true }]}>
                                    <Input placeholder="请输入英文名称" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="descript" name="descript" rules={[{ required: true }]}>
                                    <Input placeholder="请输入英文名称" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="node" name="node" rules={[{ required: true }]}>
                                    <Input placeholder="请输入英文名称" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="parent" name="parent" rules={[{ required: true }]}>
                                    <Input placeholder="请输入英文名称" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="hasChildren" name="hasChildren" rules={[{ required: true }]}>
                                    <Radio.Group options={options} defaultValue="是" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Collapse.Panel>
                </Collapse>
                <div style={{ textAlign: 'right' }}>
                    <Space size="small">
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                        <a
                            style={{ fontSize: 12 }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
                        </a>
                    </Space>
                </div>
            </Form>
        </Fragment>
    );
};


export default App;