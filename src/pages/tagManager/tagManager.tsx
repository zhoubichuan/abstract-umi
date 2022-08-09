import React, { Component } from 'react';
import {
    Tag,
    List,
    Spin,
    Avatar,
    Table,
    Input,
    Popconfirm,
    Button,
    Form,
    message,
    Col,
    Row,
    Modal,
} from 'antd';
import { EditTwoTone, MessageTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { SliderRight } from './SliderRight';
import { SearchForm } from './SearchForm';
import tagService from '@/services/tag';
// import moment from 'moment';
import ThemeContext from './ThemeContext';
// require('moment/locale/zh-cn.js');

export default class Article extends Component {
    state = {
        tabsItem: {},
        categories: [],
        items: [],
        loading: false,
        commentVisible: false,
        mode: '',
        item: {},
        tags: [],
        keyword: '',
        pagination: {},
        selectedRowkKeys: [],
    };
    componentDidMount() {
        this.getList();
    }
    pageChange = current => {
        this.setState(
            {
                pagination: {
                    ...this.state.pagination,
                    current,
                },
            },
            this.getList(),
        );
    };
    getList = () => {
        this.setState({
            loading: true,
        });
        tagService
            .searchTagList({
                current: this.state.pagination.current,
                keyword: this.state.keyword,
            })
            .then(res => {
                this.setState({
                    loading: false,
                });

                if (res?.code == 0) {
                    const { items, pageNum: current, pageSize, total } = res?.data;
                    this.setState({
                        items: items.map(
                            (item, index) => (
                                ((item.index = index + 1), (item.key = item._id)), item
                            ),
                        ),
                        pagination: {
                            current,
                            pageSize,
                            total,
                            showQuickJumper: true,
                            showTotal: total => `共计${total}条`,
                            onChange: this.pageChange,
                        },
                    });
                } else {
                    message.error(res?.data);
                }
            });
    };
    handleCreate = () => {
        const itemValue = {
            type: 'create',
            title: '创建',
            key: 'create',
            item: { key: 'create' },
            categories: this.state.categories,
            tags: this.state.tags,
        };
        const tabsItem = this.state.tabsItem;
        itemValue.key && (tabsItem[itemValue.key] = itemValue);
        this.setState({
            tabsItem,
        });
    };
    handleEdit = item => {
        const itemValue = {
            type: 'edit',
            title: item.name,
            key: 'create',
            item: item,
            categories: this.state.categories,
            tags: this.state.tags,
        };
        const tabsItem = this.state.tabsItem;
        itemValue.key && (tabsItem[itemValue.key] = itemValue);
        this.setState({
            tabsItem,
        });
    };
    handleView = ({ _id }) => {
        tagService.queryTagDetail(_id).then(res => {
            if (res?.code == 0) {
                const item = res.data;
                const itemValue = {
                    type: 'view',
                    title: item.name,
                    key: item._id,
                    item: item,
                };
                const tabsItem = this.state.tabsItem;
                itemValue.key && (tabsItem[itemValue.key] = itemValue);
                this.setState({
                    tabsItem,
                });
            } else {
                message.error(res?.data);
            }
        });
    };
    viewCancel = () => {
        this.setState({
            viewVisible: false,
        });
    };
    handleRemove = ids => {
        tagService.deleteTag(ids).then(res => {
            if (res?.code == 0) {
                message.success('删除数据成功');
                this.setState({}, this.getList());
            }
        });
    };
    // handleSearch = (keyword) => {
    //   this.setState(
    //     {
    //       keyword,
    //       pagination: {
    //         ...this.state.pagination,
    //         current: 1,
    //       },
    //     },
    //     this.getList()
    //   )
    // }
    commentCancel = () => {
        this.setState({
            commentVisible: false,
        });
    };
    comment = item => {
        this.setState({
            commentVisible: true,
            item,
        });
    };
    handleSearch = async (pagination, filters, sorter) => {
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
            filters['rows'] = pagination.pageSize;
            filters['page'] = pagination.current;
            this.setState({
                page: pagination.current,
            });
        } else {
            this.setState({
                page: 1,
            });
        }
        // 刷新表格
        filters.current = 1;
        filters.pageSize = 10;
        const result = await tagService.searchTagList(filters);

        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data.item,
            total: result.data.total,
            id: 0,
        });
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
        const result = await tagService.createTag(filters);
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
            this.getList();
        }
    };
    close = async () => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
        });
    };
    handleCloseTabs = () => {
        this.setState({
            tabsItem: {},
        });
    };
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 60,
                fixed: 'left',
            },
            {
                title: '中文名称',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                render: (text:string, record) => (
                    <a
                        onClick={() => this.handleView(record)}
                        className={'text-ellipsis'}
                        title={text}
                    >
                        {text}
                    </a>
                ),
            },
            {
                title: '英文名称',
                dataIndex: 'nameEn',
                key: 'nameEn',
                sorter: (a, b) => a.nameEn.length - b.nameEn.length,
                render: text => (
                    <div className={'text-ellipsis'} title={text}>
                        {text}
                    </div>
                ),
            },
            {
                title: '中文描述',
                dataIndex: 'descript',
                key: 'descript',
                sorter: (a, b) => a.descript.length - b.descript.length,
                render: text => (
                    <div className={'text-ellipsis'} title={text}>
                        {text}
                    </div>
                ),
            },
            {
                title: '英文描述',
                dataIndex: 'descriptEn',
                key: 'descriptEn',
                sorter: (a, b) => a.descriptEn.length - b.descriptEn.length,
                render: text => (
                    <div className={'text-ellipsis'} title={text}>
                        {text}
                    </div>
                ),
            },
            {
                title: '创建者',
                dataIndex: 'creator',
                key: 'creator',
                sorter: (a, b) => a.creator.length - b.creator.length,
                render: text => (
                    <div className={'text-ellipsis'} title={text}>
                        {text}
                    </div>
                ),
            },
            {
                title: '创建时间',
                dataIndex: 'creatTime',
                key: 'createAt',
                sorter: (a, b) => a.creatTime.length - b.creatTime.length,
                // render: text => moment(text).fromNow(),
            },
            {
                title: '更新者',
                dataIndex: 'updater',
                key: 'updater',
                sorter: (a, b) => a.updater.length - b.updater.length,
                render: text => (
                    <div className={'text-ellipsis'} title={text}>
                        {text}
                    </div>
                ),
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                sorter: (a, b) => a.updateTime.length - b.updateTime.length,
                // render: text => moment(text).fromNow(),
            },

            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                fixed: 'right',
                render: (text, record, index) => {
                    return (
                        <div className="icons-list">
                            <EditTwoTone onClick={() => this.handleEdit(record)} />
                            <MessageTwoTone
                                onClick={() => this.comment(record)}
                                style={{ marginLeft: '10px' }}
                            />
                            <Popconfirm onConfirm={() => this.remove(record._id)}>
                                <DeleteTwoTone style={{ marginLeft: '10px' }} />
                            </Popconfirm>
                        </div>
                    );
                },
            },
        ];
        const rowSelection = {
            onChange: selectedRowkKeys => {
                this.setState({
                    selectedRowkKeys,
                });
            },
        };

        return (
            <div
                className="common-page"
                style={{
                    padding: 8,
                }}
            >
                <div className="common-content">
                    <SearchForm
                        search={this.handleSearch}
                        categories={this.state.categories}
                        close={this.close}
                        type={1}
                        className={'search'}
                    />
                    <Button.Group className={'common-button'}>
                        <Button type="primary" onClick={this.handleCreate}>
                            创建
                        </Button>
                        <Button
                            style={{
                                marginLeft: 5,
                            }}
                            type="primary"
                            onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
                        >
                            删除
                        </Button>
                    </Button.Group>
                    <Table
                        className={'common-table'}
                        loading={this.state.loading}
                        columns={columns}
                        scroll={{ x: 1700 }}
                        dataSource={this.state.items}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                    />
                </div>
                <ThemeContext.Provider value={this.state.tabsItem}>
                    <SliderRight handleCloseTabs={this.handleCloseTabs} />
                </ThemeContext.Provider>
            </div>
        );
    }
}
class CommentModal extends Component {
    state = {
        start: 0,
        limit: 5,
        loading: false,
        comments: this.props.item.comments.slice(0, 5),
    };
    loading = () => {
        this.setState({
            loading: true,
        });
        setTimeout(() => {
            this.setState(
                {
                    start: this.state.start + this.state.limit,
                },
                () => {
                    this.setState({
                        loading: false,
                        comments: this.props.item.comments.slice(
                            0,
                            this.state.start + this.state.limit,
                        ),
                    });
                },
            );
        }, 2000);
    };
    render() {
        const { getFieldDecorator } = this.props?.form || {getFieldDecorator:() => {}};
        const loadMore = this.state.start + this.state.limit < this.props.item.comments.length && (
            <div
                style={{
                    marginTop: 20,
                    textAlign: 'center',
                }}
            >
                {this.state.loading ? (
                    <Spin />
                ) : (
                    <Button onClick={this.loadMore}> 加载更多 </Button>
                )}
            </div>
        );
        return (
            <Row
                style={{
                    marginTop: 15,
                }}
            >
                <Col span={24}>
                    <Form>
                        <Form.Item>
                            {getFieldDecorator('content')(<Input placeholder="请输入评论内容" />)}
                        </Form.Item>
                    </Form>
                    <List
                        loading={this.state.loading}
                        dataSource={this.state.comments}
                        loadMore={loadMore}
                        renderItem={(item, index) => (
                            <List.Item
                                key={index}
                                actions={[
                                    <Button
                                        key={index}
                                        onClick={() =>
                                            this.props.deleteComment(this.props.item._id, item._id)
                                        }
                                        type="primary"
                                        icon="delete"
                                    >
                                        删除
                                    </Button>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={item.user.username}
                                    description={item.user.email}
                                />
                                <div> {item.content} </div>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        );
    }
}
