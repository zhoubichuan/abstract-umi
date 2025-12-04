

import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space,Collapse } from 'antd';
const BaseInfo: React.FC = (props) => {
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        padding: 24,
    };


    const handleCloseTabs = (values: any) => {
        props.search(values)
    };
    const handleSave = async () => {

    };
    return (
        <Form form={form} name="base-info" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Collapse defaultActiveKey={['1', '2']}>
                    <Collapse.Panel header="基本信息" key="1">
                        <Col span={12}>
                            <Form.Item label="中文名称" name="name">
                                <Input placeholder="中文名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="英文名称" name="nameEn">
                                <Input placeholder="英文名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="中文描述" name="descript">
                                <Input placeholder="中文描述" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="英文描述" name="descriptEn">
                                <Input placeholder="英文描述" />
                            </Form.Item>
                        </Col>
                    </Collapse.Panel>
                    <Collapse.Panel header="编辑信息" key="2">
                        <Col span={12}>
                            <Form.Item label="更新者" name="updater">
                                <Input placeholder="更新者" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="创建者" name="creater">
                                <Input placeholder="创建者" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="更新时间" name="updateTime">
                                <Input placeholder="更新时间" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="创建时间" name="creatTime">
                                <Input placeholder="创建时间" />
                            </Form.Item>
                        </Col>
                    </Collapse.Panel>
                </Collapse>
            </Row>

            <div style={{ textAlign: 'right' }}>
                <Space size="small">
                    <Button type="primary" onClick={handleSave}>
                        保存
                    </Button>
                    <Button
                        onClick={handleCloseTabs}
                    >
                        取消
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


export default BaseInfo;