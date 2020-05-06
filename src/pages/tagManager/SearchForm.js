import React, { Component } from "react"
import {
  Form,
  Row,
  Col,
  Collapse,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd"
import { DownOutlined, UpOutlined } from "@ant-design/icons"

const { RangePicker } = DatePicker
export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
    }
  }
  handleSubmit = async () => {
    let adopt = false
    this.props.form.validateFields((err) => {
      if (err) {
        adopt = false
      } else {
        adopt = true
      }
    })
    if (adopt) {
      let params = this.props.form.getFieldsValue()
      params["startDate"] = this.startDate
      params["endDate"] = this.endDate
      this.props.search(null, params, null)
    }
  }
  handleExpand = () => {
    this.setState({ expand: !this.state.expand })
  }
  getDate = (date, dateString) => {
    this.startDate = dateString[0]
    if (dateString[1] > 0) {
      this.endDate = dateString[1] + " 23:59:59"
    } else {
      this.endDate = dateString[1]
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const layout = {
      justify: "center",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    return (
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="搜索条件" key="1">
          <Form {...layout} name="search-component" className="search-form">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="中文名称">
                  {getFieldDecorator("name")(
                    <Input placeholder="请输入英文名称" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="英文名称">
                  {getFieldDecorator("nameEn")(
                    <Input placeholder="请输入英文名称" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="分类">
                  {getFieldDecorator("category")(
                    <Select>
                      {this.props.categories.map((item) => (
                        <Select.Option key={item._id} value={item._id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="创建者">
                  {getFieldDecorator("creater")(
                    <Input placeholder="请输入创建者" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="创建时间">
                  {getFieldDecorator("creatTime")(
                    <RangePicker onChange={this.getDate} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="更新者">
                  {getFieldDecorator("updater")(
                    <Input placeholder="请输入更新者" />
                  )}
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: "center" }}>
                <Button type="primary" onClick={this.handleSubmit}>
                  搜索
                </Button>
                <Button style={{ margin: "0 8px" }} onClick={() => {}}>
                  清除
                </Button>
                <a style={{ fontSize: 12 }} onClick={this.handleExpand}>
                  {this.state.expand ? <UpOutlined /> : <DownOutlined />}{" "}
                  Collapse
                </a>
              </Col>
            </Row>
          </Form>
        </Collapse.Panel>
      </Collapse>
    )
  }
}
export let SearchForm = Form.create()(Search)
