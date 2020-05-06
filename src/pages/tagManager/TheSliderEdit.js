import React, { Component } from "react"
import {
  Collapse,
  Tabs,
  Input,
  Button,
  Form,
  Select,
  Col,
  Row,
  Upload,
} from "antd"
import { UploadOutlined, CloseOutlined } from "@ant-design/icons"

function callback(key) {
  console.log(key)
}
class TheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewVisible: this.props.viewVisible,
      editVisible: this.props.editVisible,
      item: this.props.item,
      isCreate: this.props.isCreate,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      viewVisible: nextProps.viewVisible,
      isCreate: nextProps.isCreate,
      editVisible: nextProps.editVisible,
      item: nextProps.item,
    })
  }

  handleCloseTabs = () => {
    this.setState({
      viewVisible: false,
      editVisible: false,
      isCreate: false,
    })
  }
  componentWillUnmount() {
    this.props.form.resetFields()
  }
  onChange = () => {
    this.setState(this.state.item)
  }
  handleSave = async () => {
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
      params["id"] = this.state.item._id
      this.props.save(null, params, null)
    }
  }
  viewTabs() {
    return (
      !(this.state.isCreate || this.state.editVisible) || this.state.viewVisible
    )
  }
  render() {
    const layout = {
      justify: "center",
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div
        className="the-slider"
        style={{
          display:
            this.state.isCreate ||
            this.state.editVisible ||
            this.state.viewVisible
              ? "block"
              : "none",
        }}
      >
        <CloseOutlined
          style={{
            fontSize: "20px",
            position: "absolute",
            right: "10px",
            top: "10px",
            width: "20px",
            zIndex: 1000,
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={this.handleCloseTabs}
        />
        <Tabs defaultActiveKey="1" onChange={callback} className="tabs">
          <Tabs.TabPane
            tab={this.state.item.name || "创建模型"}
            key="1"
            className="common-tabs"
          >
            <Form {...layout} className="base-info">
              <Row gutter={24}>
                <Collapse defaultActiveKey={["1", "2"]}>
                  <Collapse.Panel header="基本信息" key="1">
                    <Col span={12}>
                      <Form.Item label="中文名称">
                        {getFieldDecorator("name")(
                          <Input
                            disabled={this.viewTabs()}
                            placeholder="请输入英文名称"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="英文名称">
                        {getFieldDecorator("nameEn")(
                          <Input
                            disabled={this.viewTabs()}
                            placeholder="请输入英文名称"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="中文描述">
                        {getFieldDecorator("descript")(
                          <Input.TextArea
                            disabled={this.viewTabs()}
                            placeholder="请输入中文描述"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="英文描述">
                        {getFieldDecorator("descriptEn")(
                          <Input.TextArea
                            disabled={this.viewTabs()}
                            placeholder="请输入英文描述"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="内容">
                        {getFieldDecorator("content")(
                          <Input.TextArea
                            disabled={this.viewTabs()}
                            placeholder="请输入内容"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="标签">
                        {getFieldDecorator("tag")(
                          <Select disabled={this.viewTabs()}>
                            {this.props.categories.map((item) => (
                              <Select.Option key={item._id} value={item._id}>
                                {item.name}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="分类">
                        {getFieldDecorator("category")(
                          <Select disabled={this.viewTabs()}>
                            {this.props.categories.map((item) => (
                              <Select.Option key={item._id} value={item._id}>
                                {item.name}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="upload" label="上传文件">
                        <Upload
                          name="logo"
                          action="/upload.do"
                          listType="picture"
                        >
                          <Button>
                            <UploadOutlined /> Click to upload
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Collapse.Panel>
                  {!this.state.isCreate && (
                    <Collapse.Panel header="编辑信息" key="2">
                      <Col span={12}>
                        <Form.Item label="更新者">
                          {getFieldDecorator("updater")(
                            <Input disabled placeholder="请输入更新者" />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="创建者">
                          {getFieldDecorator("creater")(
                            <Input disabled placeholder="请输入创建者" />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="更新时间">
                          {getFieldDecorator("updateTime")(
                            <Input disabled placeholder="更新时间" />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="创建时间">
                          {getFieldDecorator("creatTime")(
                            <Input disabled placeholder="创建时间" />
                          )}
                        </Form.Item>
                      </Col>
                    </Collapse.Panel>
                  )}
                </Collapse>
              </Row>
            </Form>
            <Col className="button">
              <Button type="primary" onClick={this.handleSave}>
                保存
              </Button>
              <Button
                style={{ marginLeft: "20px" }}
                onClick={this.handleCloseTabs}
              >
                取消
              </Button>
            </Col>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export let TheSliderEdit = Form.create({
  mapPropsToFields(props) {
    let item = props.viewVisible || !props.isCreate ? props.item : []
    return item
      ? {
          name: Form.createFormField({
            value: item.name,
          }),
          nameEn: Form.createFormField({
            value: item.nameEn,
          }),
          descript: Form.createFormField({
            value: item.descript,
          }),
          descriptEn: Form.createFormField({
            value: item.descriptEn,
          }),
          content: Form.createFormField({
            value: item.content,
          }),
          tag: Form.createFormField({
            value: props.tag,
          }),
          category: Form.createFormField({
            value: props.categories.name,
          }),

          updater: Form.createFormField({
            value: item.updater,
          }),
          creater: Form.createFormField({
            value: item.creater,
          }),
          updateTime: Form.createFormField({
            value: item.updateTime,
          }),
          creatTime: Form.createFormField({
            value: item.creatTime,
          }),
        }
      : {}
  },
})(TheSlider)
