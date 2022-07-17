import React from "react"
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  Upload,
  Icon,
  message,
} from "antd"
import "braft-editor/dist/index.css"
import "braft-extensions/dist/table.css"
import BraftEditor from "braft-editor"
import Table from "braft-extensions/dist/table.js"
import axios from "axios"

const { Item } = Form
const { Option } = Select
export default class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      visible: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    })
  }
  //创建任务
  handleAddSubmit = () => {
    this.addFormData.props.form.validateFields((err, value) => {
      if (!err) {
        let softFunction = []
        value.softFunction.map((item) => softFunction.push(item.label))
        const param = {
          ...value,
          scene: value.scene.toHTML(),
          attachment: value.attachment
            ? value.attachment.file.response
              ? value.attachment.file.response.data
              : null
            : null,
          softFunction: softFunction.join(","),
          projectCategory: value.projectCategory.label,
        }
        axios
          .post("http://127.0.0.1:7001/api/upload", { param })
          .then((res) => {
            console.log(res)
          })
      }
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }
  render() {
    const { isEdit } = this.state
    return (
      <Modal
        maskClosable={false}
        width={"50%"}
        title="Basic Modal"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText={"保存"}
        okType={"primary"}
        title={"创建模型想属性"}
      >
        <div style={{ textAlign: "center" }}>
          {isEdit ? null : (
            <Editor
              wrappedComponentRef={(formData) => (this.addFormData = formData)}
            />
          )}
          <Button
            onClick={isEdit ? null : this.handleAddSubmit}
            type={"primary"}
          >
            保存
          </Button>
        </div>
      </Modal>
    )
  }
}

/**
 * 创建任务的表单
 */
class AddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scene: "<p></p>",
      fileList: [],
    }
  }

  componentDidMount() {
    BraftEditor.use(Table())
    this.props.form.setFieldsValue({
      scene: BraftEditor.createEditorState("<p></p>"),
    })
  }

  beforeUpload = (file) => {
    const isLt100M = file.size / 1024 / 1024 < 100
    if (!isLt100M) {
      message.error("附件最多不超过100MB!")
    }
    return isLt100M
  }
  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { getFieldDecorator } = this.props?.form || {getFieldDecorator:() => {}}
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    const uploadProps = {
      name: "files",
      action: "http://127.0.0.1:7001/api/upload",
      multiple: true,
      beforeUpload: this.beforeUpload,
      onChange: this.handleChange,
      fileList: this.state.fileList,
    }
    const uploadButton = (
      <Button>
        <Icon type="upload" /> 选择附件
      </Button>
    )
    return (
      <Row>
        <Form>
          <Col span={12}>
            <Item label={"中文名称"} {...formItemLayout}>
              {getFieldDecorator("nameCn", {
                rules: [
                  {
                    required: true,
                    message: "中文名称不能为空",
                  },
                ],
              })(<Input />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label={"英文名称"} {...formItemLayout}>
              {getFieldDecorator("nameEn", {
                rules: [
                  {
                    required: true,
                    message: "英文名称不能为空",
                  },
                ],
              })(<Input />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label={"属性类型"} {...formItemLayout}>
              {getFieldDecorator("projectCategory", {
                rules: [
                  {
                    required: true,
                    message: "属性类型不能为空",
                  },
                ],
              })(
                <Select labelInValue={true}>
                  <Option key={"1"}>数字</Option>
                  <Option key={"2"}>布尔值</Option>
                  <Option key={"3"}>字符串</Option>
                  <Option key={"4"}>铁路</Option>
                  <Option key={"5"}>地铁</Option>
                  <Option key={"6"}>其他</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={12}>
            <Item label={"中文描述"} {...formItemLayout}>
              {getFieldDecorator("descriptCn", {
                rules: [
                  {
                    required: true,
                    message: "中文描述不能为空",
                  },
                ],
              })(<Input.TextArea />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label={"英文描述"} {...formItemLayout}>
              {getFieldDecorator("descriptEn", {
                rules: [
                  {
                    required: true,
                    message: "英文描述不能为空",
                  },
                ],
              })(<Input.TextArea />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label={"联系人员"} {...formItemLayout}>
              {getFieldDecorator("contact", {
                rules: [
                  {
                    required: true,
                    message: "联系人员不能为空",
                  },
                ],
              })(<Input />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label={"联系方式"} {...formItemLayout}>
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "联系方式不能为空",
                  },
                ],
              })(<Input />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label={"软件功能"}
              {...formItemLayout}
              extra={"数据采集、仪器管理、数据管理、系统管理为必选内容"}
            >
              {getFieldDecorator("softFunction", {
                rules: [
                  {
                    required: true,
                    message: "软件功能不能为空",
                  },
                ],
              })(
                <Select mode={"multiple"} labelInValue>
                  <Option key={"1"}>数据采集</Option>
                  <Option key={"2"}>仪器管理</Option>
                  <Option key={"3"}>数据管理</Option>
                  <Option key={"4"}>数据整编</Option>
                  <Option key={"5"}>资料分析</Option>
                  <Option key={"6"}>报表报告</Option>
                  <Option key={"7"}>巡视检测</Option>
                  <Option key={"8"}>系统管理</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Form>
      </Row>
    )
  }
}

const Editor = AddForm
