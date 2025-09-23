import React, { Component } from 'react';
import { Form, Row, Col, Table, Button, Modal, message, Popconfirm, Input } from 'antd';
import categoryService from '@/services/category';
// import moment from 'moment';
// require('moment/locale/zh-cn.js');
import service from "@/services/user"

export default class Category extends Component {
    state = {
        items: [],
        item: {},
        title: '',
        keyword: '',
        selectedRowKeys: [],
        editVisible: false,
        pagination: {},
        isCreate: true,
    };
    //开始执行添加操作
    create = () => {
        this.setState({
            title: '添加分类',
            isCreate: true,
            editVisible: true,
        });
    };
    componentDidMount() {
        this.getList();
    }
    pageChange = current => {
        this.setState({ pagination: { ...this.state.pagination, current } }, this.getList);
    };
    getList = () => {
        service.query({query:{}}).then((res) => {
            if (res?.code === 0) {
                const { data, pageNum: current=1, pageSize=20, total=0 } = res?.data;
                this.setState({
                    items: data.map(
                        (item, index) => (
                            ((item.key = item._id),
                                (item.index = index + 1),
                                (item.code = item.code),
                                (item.creator = item.creator),
                                (item.createTime = item.createTime),
                                (item.updater = item.updater),
                                (item.updateTime = item.updateTime)),
                            item
                        ),
                    ),
                    pagination: {
                        current,
                        pageSize,
                        total,
                        showTotal: total => `总计${total}条`,
                        showQuickJumper: true,
                        onChange: this.pageChange,
                    },
                });
            } else {
                message.error(res.error)
            }
        })

    };
    editCancel = () => {
        this.setState({ editVisible: false });
    };
    editOk = () => {
        const category = this.editform.props.form.getFieldsValue();
        if (this.state.isCreate) {
            category.creator = 'aaa';
            // category.createTime = moment().format();
            category.updater = 'aaa';
            // category.updateTime = moment().format();
        } else {
            category.updater = 'bbb';
            // category.updateTime = moment().format();
        }
        categoryService[this.state.isCreate ? 'create' : 'update'](category).then(res => {
            if (res?.code == 0) {
                this.setState({ editVisible: false }, this.getList());
            } else {
                message.error(res.error);
            }
        });
    };
    edit = item => {
        this.setState({
            title: '更新分类',
            editVisible: true,
            isCreate: false,
            item,
        });
    };
    remove = id => {
        categoryService.remove(id).then(res => {
            if (res?.code == 0) {
                this.setState(
                    {
                        pagination: {
                            ...this.state.pagination,
                            current: 1,
                        },
                    },
                    this.getList,
                );
            }
        });
    };
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 100,
                fixed: 'left',
            },
            {
                title: '编码',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                fixed: 'left',
            },
            { title: '名称', dataIndex: 'username', key: 'username' },
            { title: '账号', dataIndex: 'tags', key: 'tags' },
            { title: '电话', dataIndex: 'tel', key: 'tel' },
            { title: '邮箱', dataIndex: 'email', key: 'email' },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                // render: text => moment(text).fromNow(),
            },
            {
                title: '更新者',
                dataIndex: 'updater',
                key: 'updater',
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                // render: text => moment(text).fromNow(),
            },
            {
                title: '操作',
                width: 200,
                fixed: 'right',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        <Button.Group>
                            <Button type="primary" onClick={() => this.edit(record)}>
                                修改
                            </Button>
                            <Popconfirm
                                title="Are you sure？"
                                onConfirm={() => this.remove(record._id)}
                            >
                                <Button style={{ marginLeft: 10 }} type="primary">
                                    删除
                                </Button>
                            </Popconfirm>
                        </Button.Group>
                    );
                },
            },
        ];
        const rowSelection = {
            onChange: selectedRowKeys => {
                this.setState({ selectedRowKeys });
            },
        };
        return (
            <div className="common-page" style={{ paddingLeft: 10 }}>
                <Row>
                    <Col span={6}>
                        <Button.Group>
                            <Button type="primary" onClick={this.create}>
                                新建
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                type="primary"
                                onClick={() => this.remove(this.state.selectedRowKeys)}
                            >
                                删除
                            </Button>
                        </Button.Group>
                    </Col>
                    <Col span={18}>
                        <Input.Search
                            enterButton
                            placeholder="请输入关键字"
                            onSearch={keyword => this.setState({ keyword }, this.getList)}
                        />
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 10 }}
                    columns={columns}
                    dataSource={this.state.items}
                    bordered
                    pagination={this.state.pagination}
                    rowSelection={rowSelection}
                />
                <Modal
                    title={this.state.title}
                    visible={this.state.editVisible}
                    onCancel={this.editCancel}
                    onOk={this.editOk}
                    closable
                    destroyOnClose
                >
                    <EditModal
                        wrappedComponentRef={inst => (this.editform = inst)}
                        isCreate={this.state.isCreate}
                        item={this.state.item}
                    />
                </Modal>
            </div>
        );
    }
}
class EditModal extends Component {
    render() {
        return (
            <Form>
                <Form.Item
                    name="name"
                    intialValue={this.props.isCreate ? '' : this.props.item.name}
                    rules={[{ required: true, message: '请输入分类名称' }]}
                >
                    <Input placeholder="请输入分类名称 " />
                </Form.Item>
                <Form.Item
                    name="tags"
                    intialValue={this.props.isCreate ? '' : this.props.item.tags}
                    rules={[{ required: true, message: '请输入标签' }]}
                >
                    <Input placeholder="请输入标签" />
                </Form.Item>
                <Form.Item
                    name="descript"
                    intialValue={this.props.isCreate ? '' : this.props.item.descript}
                    rules={[{ required: true, message: '请输入标签' }]}
                >
                    <Input.TextArea placeholder="请输入描述" />
                </Form.Item>
                {!this.props.isCreate && (
                    <Form.Item name="id" intialValue={this.props.item._id}>
                        <Input type="hidden" />
                    </Form.Item>
                )}
            </Form>
        );
    }
}
