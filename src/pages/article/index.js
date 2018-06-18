import React, { Component } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Button,
  Form,
  message,
  Col,
  Row,
  Modal,
  Select,
  Card
} from "antd";
import articleService from "../../service/article";
import categoryService from "../../service/category";
import { fstatSync } from "fs";

export default class Article extends Component {
  state = {
    categories: [],
    items: [],
    editVisible: false,
    isCreate: true,
    item: {}
  };
  componentDidMount() {
    categoryService.list({ current: 1, pageSize: 10 }).then(res => {
      if (res.code == 0) {
        this.setState({ categories: res.data.items });
      }
    });
    this.getList();
  }
  getList = () => {
    articleService.list({}).then(res => {
      if (res.code == 0) {
        const { items } = res.data;
        this.setState({ items });
      }
    });
  };
  create = () => {
    this.setState({ title: "增加文章", editVisible: true, isCreate: true });
  };
  editCancle = () => {
    this.setState({ editVisible: false });
  };
  editOk = () => {
    let article = this.editform.props.form.getFieldsValue();
    articleService[this.state.isCreate ? "create" : "update"](article).then(
      res => {
        if (res.code == 0) {
          this.setState({ editVisible: false }, this.getList());
        }
      }
    );
  };
  edit = item => {
    this.setState({ editVisible: true, item, isCreate: false });
  };
  view = item => {
    this.setState({ viewVisible: true, item });
  };
  viewCancel = () => {
    this.setState({ viewVisible: false });
  };
  render() {
    let columns = [
      { title: "标题", dataIndex: "title", key: "title" },
      { title: "内容", dataIndex: "content", key: "content" },
      {
        title: "分类",
        dataIndex: "category",
        key: "category",
        render: (text, record) => {
          return text;
        }
      },
      { title: "阅读量", dataIndex: "pv", key: "pv" },
      {
        title: "创建时间",
        dataIndex: "createAt",
        key: "createAt",
        render: text => {
          text.toLocaleString();
        }
      },
      {
        title: "评论数",
        dataIndex: "comments",
        key: "comments",
        render: text => {
          return text.length;
        }
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (text, record, index) => {
          return (
            <Button.Group>
              <Button
                type="dashed"
                style={{ marginLeft: 5 }}
                onClick={() => this.view(record)}
              >
                查看
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 5 }}
                onClick={() => this.edit(record)}
              >
                编辑
              </Button>
              <Button type="dashed" style={{ marginLeft: 5 }}>
                评论
              </Button>
              <Button type="danger" style={{ marginLeft: 5 }}>
                删除
              </Button>
            </Button.Group>
          );
        }
      }
    ];
    return (
      <Row>
        <Col span="24" style={{ padding: 8 }}>
          <Row>
            <Col span="12">
              <Button.Group>
                <Button type="dashed" icon="plus-circle" onClick={this.create}>
                  添加文章
                </Button>
                <Button type="danger" icon="minus-circle">
                  删除文章
                </Button>
              </Button.Group>
            </Col>
            <Col span="12">
              <Input.Search enterButton />
            </Col>
          </Row>
          <Table columns={columns} dataSource={this.state.items} />
        </Col>

        <Modal
          visible={this.state.editVisible}
          title={this.state.title}
          onCancel={this.editCancel}
          onOk={this.editOk}
          destroyOnClose
        >
          <WrappedEditModal
            wrappedComponentRef={inst => (this.editform = inst)}
            isCreate={this.state.isCreate}
            item={this.state.item}
            categories={this.state.categories}
          />
        </Modal>
        <Modal
          visible={this.state.viewVisible}
          footer={null}
          onCancel={this.viewCancel}
          destroyOnClose
        >
          <WrappedViewModal item={this.state.item} />
        </Modal>
      </Row>
    );
  }
}
class EditModal extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("category", {
            initialValue: this.props.isCreate
              ? this.props.categories[0]._id
              : this.props.item._id,
            rules: [{ required: true, message: "选择分类" }]
          })(
            <Select>
              {this.props.categories.map(item => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("title", {
            initialValue: this.props.isCreate ? "" : this.props.item.title,
            rules: [{ required: true, message: "请输入标题" }]
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("content", {
            initialValue: this.props.isCreate ? "" : this.props.item.content,
            rules: [{ required: true, message: "请输入内容" }]
          })(<Input.TextArea placeholder="请输入内容" />)}
        </Form.Item>
        {!this.isCreate && (
          <Form.Item>
            {getFieldDecorator("id", {
              initialValue: this.props.item._id
            })(<Input type="hidden" />)}
          </Form.Item>
        )}
      </Form>
    );
  }
}
class ViewModal extends Component {
  render() {
    return (
      <Card title="查看文章" style={{ marginTop: 20 }}>
        <p>标题：{this.props.item.title}</p>
        <p>内容：{this.props.item.content}</p>
      </Card>
    );
  }
}
const WrappedEditModal = Form.create()(EditModal);
const WrappedViewModal = Form.create()(ViewModal);
