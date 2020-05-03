import React, { Component } from "react"
import { Form, Row, Col, Collapse, Input, Button } from "antd"
export class Search extends Component {
  state = {
    expand: false,
    searchData: [
      {
        name: "name",
        lable: "中文名称",
        message: "请输入中文名称",
      },
      {
        name: "nameEn",
        lable: "英文名称",
        message: "请输入英文名称",
      },
      {
        name: "descript",
        lable: "中文描述",
        message: "请输入中文描述",
      },
      {
        name: "descriptEn",
        lable: "英文描述",
        message: "请输入英文描述",
      },
      {
        name: "category",
        lable: "分类",
        message: "请输入分类",
      },
      {
        name: "creater",
        lable: "创建者",
        message: "请输入创建者",
      },
      {
        name: "updater",
        lable: "更新者",
        message: "请输入更新者",
      },
    ],
  }
  setExpand() {}
  render() {
    const getFields = () => {
      const count = this.state.expand ? 10 : 6
      const children = this.state.searchData.map((item, index) => (
        <Col span={6} key={index}>
          <Form.Item
            name={item.name}
            label={item.lable}
            rules={[
              {
                required: true,
                message: item.message,
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
      ))
      return children
    }

    const onFinish = (values) => {
      console.log("Received values of form: ", values)
    }
    const layout = {
      justify: "center",
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="搜索条件" key="1">
          <Form
            {...layout}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
          >
            <Row gutter={24}>{getFields()}</Row>
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button style={{ margin: "0 8px" }} onClick={() => {}}>
                  清除
                </Button>
                <a
                  style={{ fontSize: 12 }}
                  onClick={this.setExpand(!this.expand)}
                >
                  {/* {expand ? <CaretUpOutlined /> : <DownOutlined />} Collapse */}
                </a>
              </Col>
            </Row>
          </Form>
        </Collapse.Panel>
      </Collapse>
    )
  }
}
