import React, { Component } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Modal,
  message,
  Popconfirm,
  Input,
  Form
} from "antd";
import categoryService from "../../service/category";

export default class Category extends Component {
  state = {
    items: [],
    item: {},
    title: "",
    keyword: "",
    selectedRowKeys: [],
    editVisible: false,
    pagination: {},
    isCreate: true
  };
  //开始执行添加操作
  create = () => {
    this.setState({
      title: "添加分类",
      isCreate: true,
      editVisible: true
    });
  };
  componentDidMount() {
    this.getList();
  }
  pageChange = current => {
    this.setState(
      { pagination: { ...this.state.pagination, current } },
      this.getList
    );
  };
  getList = () => {
    categoryService
      .list({
        current: this.state.pagination.current,
        keyword: this.state.keyword
      })
      .then(res => {
        if (res.code == 0) {
          const { items, pageNum: current, pageSize, total } = res.data;
          this.setState({
            items: items.map(item => ((item.key = item._id), item)),
            pagination: {
              current,
              pageSize,
              total,
              showTotal: total => `总计${total}条`,
              showQuickJumper: true,
              onChange: this.pageChange
            }
          });
        } else {
          message.error(res.error);
        }
      });
  };
  editCancel = () => {
    this.setState({ editVisible: false });
  };
  editOk = () => {
    let category = this.editform.props.form.getFieldsValue();
    categoryService[this.state.isCreate ? "create" : "update"](category).then(
      res => {
        if (res.code == 0) {
          this.setState({ editVisible: false }, this.getList());
        } else {
          message.error(res.error);
        }
      }
    );
  };
  edit = item => {
    this.setState({
      title: "更新分类",
      editVisible: true,
      isCreate: false,
      item
    });
  };
  remove = id => {
    categoryService.remove(id).then(res => {
      if (res.code == 0) {
        this.setState(
          {
            pagination: {
              ...this.state.pagination,
              current: 1
            }
          },
          this.getList
        );
      }
    });
  };
  render() {
    const columns = [
      { title: "名称", width: 800, dataIndex: "name", key: "name" },
      {
        title: "操作",
        dataIndex: "operation",
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
                <Button style={{ marginLeft: 10 }} type="danger">
                  删除
                </Button>
              </Popconfirm>
            </Button.Group>
          );
        }
      }
    ];
    const rowSelection = {
      onChange: selectedRowKeys => {
        this.setState({ selectedRowKeys });
      }
    };
    return (
      <div style={{ paddingLeft: 10 }}>
        <Row>
          <Col span="6">
            <Button.Group>
              <Button type="default" icon="plus-circle" onClick={this.create}>
                添加分类
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                icon="delete"
                type="danger"
                onClick={() => this.remove(this.state.selectedRowKeys)}
              >
                删除所选分类
              </Button>
            </Button.Group>
          </Col>
          <Col span="18">
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
          <WrappedEditModal
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("name", {
            intialValue: this.props.isCreate ? "" : this.props.item.name,
            rules: [{ required: true, message: "请输入分类名称" }]
          })(<Input placeholder="请输入分类名称 " />)}
        </Form.Item>
        {!this.props.isCreate && (
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
const WrappedEditModal = Form.create()(EditModal);
