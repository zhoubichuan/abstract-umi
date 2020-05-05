import React, { Component } from "react"
import { Form, Row, Col, Collapse, Input, Button, Select } from "antd"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
// 城市选择
import { Cascader } from "antd"
//城市选择数据
import ChooseCity from "./ChooseCity"
// 日报时间选择器
import DailyTimePicker from "../../components/TimePicker/DailyTimePicker"
//周报时间选择器
import WeeklyPicker from "../../components/TimePicker/WeeklyPicker"
//月报时间选择器
import MonthlyPicker from "../../components/TimePicker/MonthlyPicker"
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
      let json = this.props.form.getFieldsValue()
      json["startDate"] = this.startDate
      json["endDate"] = this.endDate
      this.props.refresh(null, json, null)
    }
  }
  handleExpand() {
    this.setState({ expand: !this.state.expand })
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
                    <Input
                      placeholder="请输入英文名称"
                      style={{ width: 200 }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="英文名称">
                  {getFieldDecorator("nameEn")(
                    <Input
                      placeholder="请输入英文名称"
                      style={{ width: 200 }}
                    />
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
                    <Input placeholder="请输入创建者" style={{ width: 200 }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="创建时间">
                  {getFieldDecorator("creatTime")(<DailyTimePicker />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="更新者">
                  {getFieldDecorator("updater")(
                    <Input placeholder="请输入更新者" style={{ width: 200 }} />
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
