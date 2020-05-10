import React, { Component } from "react"
import {
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
} from "antd"
import { EditTwoTone, MessageTwoTone, DeleteTwoTone } from "@ant-design/icons"
import { TheSliderEdit } from "./TheSliderEdit"

import { SearchForm } from "./SearchForm"
import articleService from "../../service/article"
import moment from "moment"
require("moment/locale/zh-cn.js")

export default class Article extends Component {
  state = {
    categories: [],
    items: [],
    loading: false,
    editVisible: false,
    commentVisible: false,
    isCreate: false,
    item: {},
    tags: [],
    keyword: "",
    pagination: {},
    selectedRowkKeys: [],
  }
  componentDidMount() {
    this.getList()
  }
  pageChange = (current) => {
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          current,
        },
      },
      this.getList()
    )
  }
  getList = () => {
    this.setState({
      loading: true,
    })
    articleService
      .list({
        current: this.state.pagination.current,
        keyword: this.state.keyword,
      })
      .then((res) => {
        this.setState({
          loading: false,
        })

        if (res.code == 0) {
          const { items, pageNum: current, pageSize, total } = res.data
          this.setState({
            items: items.map(
              (item, index) => (
                ((item.index = index + 1), (item.key = item._id)), item
              )
            ),
            pagination: {
              current,
              pageSize,
              total,
              showQuickJumper: true,
              showTotal: (total) => `共计${total}条`,
              onChange: this.pageChange,
            },
          })
        } else {
          message.error(res.data)
        }
      })
  }
  handleCreate = () => {
    this.setState({
      viewVisible: false,
      editVisible: false,
      isCreate: true,
      item: [],
    })
  }
  handleEdit = (item) => {
    this.setState({
      editVisible: true,
      viewVisible: false,
      isCreate: false,
      item,
    })
  }
  handleView = (item) => {
    articleService.addPv(item._id).then((res) => {
      if (res.code == 0) {
        this.setState({
          viewVisible: true,
          editVisible: false,
          isCreate: false,
          item,
        })
      } else {
        message.error(res.data)
      }
    })
  }
  viewCancel = () => {
    this.setState({
      viewVisible: false,
    })
  }
  handleRemove = (ids) => {
    articleService.remove(ids).then((res) => {
      if (res.code == 0) {
        message.success("删除数据成功")
        this.setState({}, this.getList())
      }
    })
  }
  handleSearch = (keyword) => {
    this.setState(
      {
        keyword,
        pagination: {
          ...this.state.pagination,
          current: 1,
        },
      },
      this.getList()
    )
  }
  commentOk = () => {
    let comment = this.commentForm.props.form.getFieldsValue()
    articleService.addComment(this.state.item._id, comment).then((res) => {
      if (res.code == 0) {
        message.success("评论成功")
        this.setState(
          {
            commentVisible: false,
          },
          this.getList()
        )
      } else {
        message.error(res.data)
      }
    })
  }
  commentCancel = () => {
    this.setState({
      commentVisible: false,
    })
  }
  comment = (item) => {
    this.setState({
      commentVisible: true,
      item,
    })
  }
  deleteComment = (article_id, comment_id) => {
    articleService.deleteComment(article_id, comment_id).then((res) => {
      if (res.code == 0) {
        message.success("删除评论成功")
        this.setState(
          {
            commentVisible: false,
          },
          this.getList()
        )
      } else {
        message.error(res.data)
      }
    })
  }
  handleSearch = async (pagination, filters, sorter) => {
    if (typeof filters === "undefined") {
      filters = []
    }
    if (pagination === null) {
      this.json = filters
    }
    for (let p in this.json) {
      filters[p] = this.json[p]
    }
    filters["auditStatus"] = 1
    filters["sort"] = this.state.sort
    filters["order"] = this.state.order
    if (pagination !== null && typeof pagination !== "undefined") {
      filters["rows"] = pagination.pageSize
      filters["page"] = pagination.current
      this.setState({
        page: pagination.current,
      })
    } else {
      this.setState({
        page: 1,
      })
    }
    // 刷新表格
    filters.current = 1
    filters.pageSize = 10
    let result = await articleService.search(filters)

    this.setState({
      openAdd: false,
      openTableAddUp: false,
      openUpdate: false,
      dataSource: result.data.item,
      total: result.data.total,
      id: 0,
    })
  }
  save = async (pagination, filters, sorter) => {
    if (typeof filters === "undefined") {
      filters = []
    }
    if (pagination === null) {
      this.json = filters
    }
    for (let p in this.json) {
      filters[p] = this.json[p]
    }
    filters["auditStatus"] = 1
    filters["sort"] = this.state.sort
    filters["order"] = this.state.order
    if (pagination !== null && typeof pagination !== "undefined") {
      this.setState({
        page: pagination.current,
      })
    } else {
      this.setState({
        page: 1,
      })
    }
    let result = await articleService[
      this.state.isCreate ? "create" : "update"
    ](filters)
    if (result.code == 0) {
      this.setState({
        openAdd: false,
        openTableAddUp: false,
        openUpdate: false,
        dataSource: result.data,
        total: result.data,
        id: 0,
      })
      message.success(this.state.isCreate ? "创建数据成功" : "更新数据成功")
      this.getList()
    }
  }
  close = async () => {
    this.setState({
      openAdd: false,
      openTableAddUp: false,
      openUpdate: false,
    })
  }
  render() {
    let columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 60,
        fixed: "left",
      },
      {
        title: "中文名称",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <a
            onClick={() => this.handleView(record)}
            className={"text-ellipsis"}
            title={text}
          >
            {text}
          </a>
        ),
      },
      {
        title: "英文名称",
        dataIndex: "nameEn",
        key: "nameEn",
        render: (text) => (
          <div className={"text-ellipsis"} title={text}>
            {text}
          </div>
        ),
      },
      {
        title: "中文描述",
        dataIndex: "descript",
        key: "descript",
        render: (text) => (
          <div className={"text-ellipsis"} title={text}>
            {text}
          </div>
        ),
      },
      {
        title: "英文描述",
        dataIndex: "descriptEn",
        key: "descriptEn",
        render: (text) => (
          <div className={"text-ellipsis"} title={text}>
            {text}
          </div>
        ),
      },
      {
        title: "内容",
        dataIndex: "content",
        key: "content",
        render: (text) => (
          <div className={"text-ellipsis"} title={text}>
            {text}
          </div>
        ),
      },
      {
        title: "分类",
        dataIndex: "category",
        key: "category",
        render: (text, record) => {
          return text && text.name
        },
      },
      {
        title: "标签",
        dataIndex: "tag",
        key: "tag",
        render: (text, record) => {
          return text
        },
      },
      {
        title: "阅读量",
        dataIndex: "pv",
        key: "pv",
      },
      {
        title: "创建者",
        dataIndex: "creator",
        key: "creator",
        render: (text) => (
          <div className={"text-ellipsis"} title={text}>
            {text}
          </div>
        ),
      },
      {
        title: "创建时间",
        dataIndex: "creatTime",
        key: "createAt",
        render: (text) => moment(text).fromNow(),
      },
      {
        title: "更新者",
        dataIndex: "updater",
        key: "updater",
        render: (text) => (
          <div className={"text-ellipsis"} title={text}>
            {text}
          </div>
        ),
      },
      {
        title: "更新时间",
        dataIndex: "updateTime",
        key: "updateTime",
        render: (text) => moment(text).fromNow(),
      },
      {
        title: "评论数",
        dataIndex: "comments",
        key: "comments",
        render: (text) => text.length,
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        render: (text, record, index) => {
          return (
            <div className="icons-list">
              <EditTwoTone onClick={() => this.handleEdit(record)} />
              <MessageTwoTone
                onClick={() => this.comment(record)}
                style={{ marginLeft: "10px" }}
              />
              <Popconfirm onConfirm={() => this.remove(record._id)}>
                <DeleteTwoTone style={{ marginLeft: "10px" }} />
              </Popconfirm>
            </div>
          )
        },
      },
    ]
    let rowSelection = {
      onChange: (selectedRowkKeys) => {
        this.setState({
          selectedRowkKeys,
        })
      },
    }
    return (
      <div
        className="common-page"
        span="24"
        style={{
          padding: 8,
        }}
      >
        <SearchForm
          search={this.handleSearch}
          categories={this.state.categories}
          close={this.close}
          type={1}
          className={"search"}
        />
        <Button.Group className={"button"}>
          <Button type="primary" icon="plus-circle" onClick={this.handleCreate}>
            创建
          </Button>
          <Button
            style={{
              marginLeft: 5,
            }}
            type="danger"
            icon="minus-circle"
            onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
          >
            删除
          </Button>
          <Button
            style={{
              marginLeft: 5,
            }}
            type="danger"
            icon="download"
            className="export-table"
          >
            导出表格
          </Button>
        </Button.Group>
        <Table
          className={"table"}
          loading={this.state.loading}
          columns={columns}
          scroll={{ x: 1500 }}
          dataSource={this.state.items}
          pagination={this.state.pagination}
          rowSelection={rowSelection}
        />
        <TheSliderEdit
          save={this.save}
          viewVisible={this.state.viewVisible}
          item={this.state.item}
          editVisible={this.state.editVisible}
          categories={this.state.categories}
          tags={this.state.tags}
          isCreate={this.state.isCreate}
          item={this.state.item}
        />
        <Modal
          visible={this.state.commentVisible}
          onCancel={this.commentCancel}
          onOk={this.commentOk}
          destroyOnClose
        >
          <WrappedCommentModal
            wrappedComponentRef={(inst) => (this.commentForm = inst)}
            item={this.state.item}
            deleteComment={this.deleteComment}
          />
        </Modal>
      </div>
    )
  }
}
class CommentModal extends Component {
  state = {
    start: 0,
    limit: 5,
    loading: false,
    comments: this.props.item.comments.slice(0, 5),
  }
  loading = () => {
    this.setState({
      loading: true,
    })
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
              this.state.start + this.state.limit
            ),
          })
        }
      )
    }, 2000)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const loadMore = this.state.start + this.state.limit <
      this.props.item.comments.length && (
      <div
        style={{
          marginTop: 20,
          textAlign: "center",
        }}
      >
        {this.state.loading ? (
          <Spin />
        ) : (
          <Button onClick={this.loadMore}> 加载更多 </Button>
        )}
      </div>
    )
    return (
      <Row
        style={{
          marginTop: 15,
        }}
      >
        <Col span="24">
          <Form>
            <Form.Item>
              {getFieldDecorator("content")(
                <Input placeholder="请输入评论内容" />
              )}
            </Form.Item>
          </Form>
          <List
            loading={this.state.loading}
            dataSource={this.state.comments}
            loadMore={loadMore}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    onClick={() =>
                      this.props.deleteComment(this.props.item._id, item._id)
                    }
                    type="danger"
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
    )
  }
}
const WrappedCommentModal = Form.create()(CommentModal)
