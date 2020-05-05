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
  Modal,
} from "antd"
import img from "./1.jpg"
import articleService from "../../service/article"
// 日报时间选择器
import DailyTimePicker from "../../components/TimePicker/DailyTimePicker"
require("moment/locale/zh-cn.js")

function callback(key) {
  console.log(key)
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-5",
        name: "image.png",
        status: "error",
      },
    ],
  }

  handleCancel = () => this.setState({ viewVisible: false, editVisible: false })

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state
    const uploadButton = (
      <div>
        {/* <PlusOutlined /> */}
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action="http://127.0.0.1:7001/api/file/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
class TheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewVisible: this.props.viewVisible,
      editVisible: this.props.editVisible,
      item: this.props.item,
      isCreate: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      viewVisible: nextProps.viewVisible,
      editVisible: nextProps.editVisible,
      item: nextProps.item,
    })
  }
  editCancel = () => {
    this.setState({
      viewVisible: false,
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
  onChange = () => {
    this.setState(this.state.item)
  }
  render() {
    const layout = {
      justify: "center",
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const layoutItem = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div
        className="the-slider"
        style={{
          display:
            this.state.editVisible || this.state.viewVisible ? "block" : "none",
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

        <Tabs defaultActiveKey="1" onChange={callback} className="tabs">
          <Tabs.TabPane tab="Tab 1" key="1" className="common-tabs">
            <Form
              {...layout}
              className="base-info"
              onFieldsChange={(changedFields, allFields) => {
                this.onChange(allFields)
              }}
            >
              <Row gutter={24}>
                <Collapse defaultActiveKey={["1", "2"]}>
                  <Collapse.Panel header="基本信息" key="1">
                    <Col span={12}>
                      <Form.Item label="中文名称">
                        {getFieldDecorator("name")(
                          <Input placeholder="请输入英文名称" />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="英文名称">
                        {getFieldDecorator("nameEn")(
                          <Input placeholder="请输入英文名称" />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="中文描述">
                        {getFieldDecorator("descript")(
                          <Input.TextArea placeholder="请输入中文描述" />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="英文描述">
                        {getFieldDecorator("descriptEn")(
                          <Input.TextArea placeholder="请输入英文描述" />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
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
                    <Col span={24}>
                      <PicturesWall />
                    </Col>
                  </Collapse.Panel>
                  <Collapse.Panel header="编辑信息" key="2">
                    <Col span={12}>
                      <Form.Item label="更新者">
                        {getFieldDecorator("updater")(
                          <Input placeholder="请输入更新者" />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="创建者">
                        {getFieldDecorator("creater")(
                          <Input placeholder="请输入创建者" />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="更新时间">
                        {getFieldDecorator("updateTime")(<DailyTimePicker />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="创建时间">
                        {getFieldDecorator("creatTime")(<DailyTimePicker />)}
                      </Form.Item>
                    </Col>
                  </Collapse.Panel>
                </Collapse>
              </Row>
            </Form>
            <Col className="button">
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
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export let TheSliderEdit = Form.create({
  mapPropsToFields(props) {
    let item = props.isCreate ? [] : props.item
    return item
      ? {
          name: Form.createFormField({
            value: item.name,
          }),
          nameEn: Form.createFormField({
            value: item.nameEn,
          }),
          category: Form.createFormField({
            value: item.category,
          }),
          descript: Form.createFormField({
            value: item.descript,
          }),
          descriptEn: Form.createFormField({
            value: item.descriptEn,
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
