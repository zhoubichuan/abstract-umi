import React, { Fragment, Component } from 'react';
import { Collapse, Input, Button, Form, Select, Col, Row, Upload, message } from 'antd';
import categoryService from '@/services/category';
import tagService from '@/services/tag';
import articleService from '@/services/article';
class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewVisible: this.props.viewVisible,
            editVisible: this.props.editVisible,
            item: this.props.item,
            isCreate: this.props.isCreate,
            categories: [],
            tags: [],
        };
    }
    componentWillMount() {
        categoryService
            .list({
                current: 1,
                pageSize: 10,
            })
            .then(res => {
                if (res?.code == 0) {
                    message.success('请求成功');
                    this.setState({
                        categories: res.data.items,
                    });
                }
            });
        tagService
            .searchTagList({
                current: 1,
                pageSize: 10,
            })
            .then(res => {
                if (res?.code == 0) {
                    message.success('请求成功');
                    this.setState({
                        tags: res.data.items,
                    });
                }
            });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            viewVisible: nextProps.viewVisible,
            isCreate: nextProps.isCreate,
            editVisible: nextProps.editVisible,
            item: nextProps.item,
        });
    }
    componentWillUnmount() {
        this.props.form.resetFields();
    }
    onChange = () => {
        this.setState(this.state.item);
    };
    save = async (pagination, filters, sorter) => {
        if (typeof filters === 'undefined') {
            filters = [];
        }
        if (pagination === null) {
            this.json = filters;
        }
        for (const p in this.json) {
            filters[p] = this.json[p];
        }
        filters['auditStatus'] = 1;
        filters['sort'] = this.state.sort;
        filters['order'] = this.state.order;
        if (pagination !== null && typeof pagination !== 'undefined') {
            this.setState({
                page: pagination.current,
            });
        } else {
            this.setState({
                page: 1,
            });
        }
        const result = await articleService['create'](filters);
        if (result.code == 0) {
            this.setState({
                openAdd: false,
                openTableAddUp: false,
                openUpdate: false,
                dataSource: result.data,
                total: result.data,
                id: 0,
            });
            message.success('创建数据成功');
            // this.getList()
        }
    };
    handleSave = async () => {
        let adopt = false;
        this.props.form.validateFields(err => {
            if (err) {
                adopt = false;
            } else {
                adopt = true;
            }
        });
        if (adopt) {
            const params = this.props.form.getFieldsValue();
            params['id'] = this.state.item._id;
            this.save(null, params, null);
        }
    };
    viewTabs() {
        return !(this.state.isCreate || this.state.editVisible) || this.state.viewVisible;
    }
    handleCloseTabs() {}
    render() {
        const layout = {
            justify: 'center',
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        const { getFieldDecorator } = this.props?.form || {getFieldDecorator:() => {}};
        return (
            <Fragment>
                <Form {...layout} className="base-info">
                    <Row gutter={24}>
                        <Collapse defaultActiveKey={['1', '2']}>
                            <Collapse.Panel header="基本信息" key="1">
                                <Col span={12}>
                                    <Form.Item label="中文名称" name="name">
                                    <Input placeholder="请输入英文名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="英文名称">
                                    <Input placeholder="请输入英文名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="中文描述" labelCol={{ span: 2 }}>
                                            <Input.TextArea placeholder="请输入中文描述" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="英文描述" labelCol={{ span: 2 }}>
                                            <Input.TextArea placeholder="请输入英文描述" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="内容">
                                            <Input.TextArea placeholder="请输入内容" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="标签">
                                        <Select>
                                            {this.state.tags.map(item => (
                                                <Select.Option key={item._id} value={item._id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="分类" name={'category'}>
                                            <Select>
                                                {this.state.categories.map(item => (
                                                    <Select.Option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>,
                                    </Form.Item>
                                </Col>
                            </Collapse.Panel>
                        </Collapse>
                    </Row>
                </Form>
                <Col className="button">
                    <Button type="primary" onClick={this.handleSave}>
                        保存
                    </Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.handleCloseTabs}>
                        取消
                    </Button>
                </Col>
            </Fragment>
        );
    }
}
export default BaseInfo
// Form.create({
//     mapPropsToFields(props) {
//         const item = props.viewVisible || !props.isCreate ? props.item : [];
//         return item
//             ? {
//                   name: Form.createFormField({
//                       value: item.name,
//                   }),
//                   nameEn: Form.createFormField({
//                       value: item.nameEn,
//                   }),
//                   descript: Form.createFormField({
//                       value: item.descript,
//                   }),
//                   descriptEn: Form.createFormField({
//                       value: item.descriptEn,
//                   }),
//                   content: Form.createFormField({
//                       value: item.content,
//                   }),
//                   tag: Form.createFormField({
//                       value: (item.tag && item.tag._id) || '',
//                   }),
//                   category: Form.createFormField({
//                       value: (item.category && item.category._id) || '',
//                   }),
//                   updater: Form.createFormField({
//                       value: item.updater,
//                   }),
//                   creater: Form.createFormField({
//                       value: item.creater,
//                   }),
//                   updateTime: Form.createFormField({
//                       value: item.updateTime,
//                   }),
//                   creatTime: Form.createFormField({
//                       value: item.creatTime,
//                   }),
//               }
//             : {};
//     },
// })(BaseInfo);
