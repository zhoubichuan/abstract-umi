import React, { Component } from "react"
import { Collapse, Tabs, Input, Button, Form, Select, Col, Row } from "antd"
import articleService from "../../service/article"
import moment from "moment"
require("moment/locale/zh-cn.js")

function callback(key) {
  console.log(key)
}
class TheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editVisible: this.props.visible,
      item: this.props.item,
      categories: this.props.categories,
      isCreate: false,
    }
  }
  componentWillReceivestate(nextProps) {
    this.setState({
      editVisible: nextProps.visible,
      item: nextProps.item,
      categories: nextProps.categories,
    })
  }
  editCancel = () => {
    this.setState({
      editVisible: false,
    })
  }
  editOk = () => {
    let article = this.editform.props.form.getFieldsValue()
    articleService[this.state.isCreate ? "create" : "update"](article).then(
      (res) => {
        if (res.code == 0) {
          this.setState(
            {
              editVisible: false,
            },
            this.getList
          )
        }
      }
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const layout = {
      justify: "center",
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const layoutItem = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    }
    console.log(this.state, "222222222222")
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "80%",
          height: "100vh",
          background: "white",
          display: this.state.editVisible ? "block" : "none",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            position: "absolute",
            right: "10px",
            top: "5px",
            width: "20px",
            zIndex: 1000,
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={this.editCancel}
        >
          x
        </span>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <Tabs.TabPane tab="Tab 1" key="1">
            <Form {...layout}>
              <Row gutter={20}>
                <Collapse defaultActiveKey={["1", "2"]}>
                  <Collapse.Panel header="基本信息" key="1">
                    <Col span={12}>
                      <Form.Item label="分类">
                        {getFieldDecorator("category", {
                          initialValue: this.state.isCreate
                            ? this.state.categories[0] &&
                              this.state.categories[0].name
                            : this.state.item.title,
                          rules: [
                            {
                              required: true,
                              message: "请输入标题",
                            },
                          ],
                        })(
                          <Select placeholder="请输入标题">
                            {this.state.categories.map((item) => (
                              <Select.Option key={item._id} value={item._id}>
                                {item.name}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="中文名称">
                        {getFieldDecorator("title", {
                          initialValue: this.state.isCreate
                            ? ""
                            : this.state.item.title,
                          rules: [
                            {
                              required: true,
                              message: "请输入标题",
                            },
                          ],
                        })(<Input placeholder="请输入标题" />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="英文名称">
                        {getFieldDecorator("title", {
                          initialValue: this.state.isCreate
                            ? ""
                            : this.state.item.title,
                          rules: [
                            {
                              required: true,
                              message: "请输入标题",
                            },
                          ],
                        })(<Input placeholder="请输入标题" />)}
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item {...layoutItem} label="中文描述">
                        {getFieldDecorator("content", {
                          initialValue: this.state.isCreate
                            ? ""
                            : this.state.item.content,
                          rules: [
                            {
                              required: true,
                              message: "请输入内容",
                            },
                          ],
                        })(<Input.TextArea placeholder="请输入内容" />)}
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item {...layoutItem} label="英文描述">
                        {getFieldDecorator("content", {
                          initialValue: this.state.isCreate
                            ? ""
                            : this.state.item.content,
                          rules: [
                            {
                              required: true,
                              message: "请输入内容",
                            },
                          ],
                        })(<Input.TextArea placeholder="请输入内容" />)}
                      </Form.Item>
                    </Col>
                    {!this.isCreate && (
                      <Form.Item>
                        {getFieldDecorator("id", {
                          initialValue: this.state.item._id,
                        })(<Input type="hidden" />)}
                      </Form.Item>
                    )}
                  </Collapse.Panel>
                  <Collapse.Panel header="编辑信息" key="2">
                    <Col span={12}>
                      <Form.Item label="创建者">
                        {getFieldDecorator("category", {
                          initialValue: this.state.isCreate
                            ? this.state.categories[0] &&
                              this.state.categories[0].name
                            : this.state.item.title,
                          rules: [
                            {
                              required: true,
                              message: "请输入标题",
                            },
                          ],
                        })(
                          <Select placeholder="请输入标题">
                            {this.state.categories.map((item) => (
                              <Select.Option key={item._id} value={item._id}>
                                {item.name}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="创建时间">
                        {getFieldDecorator("title", {
                          initialValue: this.state.isCreate
                            ? ""
                            : this.state.item.title,
                          rules: [
                            {
                              required: true,
                              message: "请输入标题",
                            },
                          ],
                        })(<Input placeholder="请输入标题" />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="更新者">
                        {getFieldDecorator("title", {
                          initialValue: this.state.isCreate
                            ? ""
                            : this.state.item.title,
                          rules: [
                            {
                              required: true,
                              message: "请输入标题",
                            },
                          ],
                        })(<Input placeholder="请输入标题" />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="更新时间">
                        {getFieldDecorator("title", {
                          initialValue: this.state.isCreate
                            ? ""
                            : this.state.item.title,
                          rules: [
                            {
                              required: true,
                              message: "请输入标题",
                            },
                          ],
                        })(<Input placeholder="请输入标题" />)}
                      </Form.Item>
                    </Col>
                    {!this.isCreate && (
                      <Form.Item>
                        {getFieldDecorator("id", {
                          initialValue: this.state.item._id,
                        })(<Input type="hidden" />)}
                      </Form.Item>
                    )}
                  </Collapse.Panel>
                </Collapse>
              </Row>
            </Form>
            <Row justify="center">
              <Col style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={this.handleSave}>
                  保存
                </Button>
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={this.handleCancel}
                >
                  取消
                </Button>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
export const WrappedTheSlider = Form.create()(TheSlider)
