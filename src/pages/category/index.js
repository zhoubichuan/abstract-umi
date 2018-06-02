import React, { Component } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Modal,
  message,
  Popconfirm,
  Input
} from "antd";

export default class Category extends Component {
  render() {
    const dataSource = [{ _id: 1, name: "分类1" }, { _id: 2, name: "分类2" }];
    const columns = [
      {
        title: "名称",
        width: 800,
        dataIndex: "name",
        key: "name1"
      },
      {
        title: "操作",
        dataIndex: "name2",
        render: function(text, record, index) {
          return (
            <Button.Group>
              <Button type="primary">修改</Button>
              <Popconfirm onConfirm={() => message.warn("你已经点了确认删除")}>
                <Button style={{ marginLeft: 10 }} type="danger">
                  删除
                </Button>
              </Popconfirm>
            </Button.Group>
          );
        }
      }
    ];
    return (
      <div style={{ paddingLeft: 10 }}>
        <Row>
          <Col span="6">
            <Button.Group>
              <Button type="default">添加分类</Button>
              <Popconfirm onConfirm={() => message.warn("你已经点了确认删除")}>
                <Button style={{ marginLeft: 10 }} type="danger">
                  删除所选分类
                </Button>
              </Popconfirm>
            </Button.Group>
          </Col>
          <Col span="18">
            <Input.Search
              enterButton
              placeholder="请输入关键字"
              onSearch={keyword => console.log(keyword)}
            />
          </Col>
        </Row>
        <Table
          style={{ marginTop: 10 }}
          columns={columns}
          dataSource={dataSource}
          bordered
        />
      </div>
    );
  }
}
