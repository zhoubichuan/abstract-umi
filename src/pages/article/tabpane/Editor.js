import React from "react"
import {
  Card,
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
import Table from "braft-extensions/dist/table"
import axios from "axios"

const { Item } = Form
const { Option } = Select
export default class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
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
          .post(
            "https://www.easy-mock.com/mock/5bfbf83591ea222a361d8316/rich/task",
            { param }
          )
          .then((res) => {
            console.log(res)
          })
      }
    })
  }
  render() {
    const { isEdit } = this.state
    return (
      <Card
        extra={
          <Button
            onClick={isEdit ? null : this.handleAddSubmit}
            type={"primary"}
          >
            保存
          </Button>
        }
        title={"创建任务"}
      >
        {isEdit ? null : (
          <AddForm
            wrappedComponentRef={(formData) => (this.addFormData = formData)}
          />
        )}
      </Card>
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
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    const uploadProps = {
      name: "files",
      action:
        "https://www.easy-mock.com/mock/5bfbf83591ea222a361d8316/rich/file/upload",
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
        <Col span={4} />
        <Col span={16}>
          <Form>
            <Item label={"客户单位"} {...formItemLayout}>
              {getFieldDecorator("company", {
                rules: [
                  {
                    required: true,
                    message: "客户单位不能为空",
                  },
                ],
              })(<Input />)}
            </Item>
            <Item label={"项目名称"} {...formItemLayout}>
              {getFieldDecorator("projectName", {
                rules: [
                  {
                    required: true,
                    message: "项目名称不能为空",
                  },
                ],
              })(<Input />)}
            </Item>
            <Item label={"项目类型"} {...formItemLayout}>
              {getFieldDecorator("projectCategory", {
                rules: [
                  {
                    required: true,
                    message: "项目类型不能为空",
                  },
                ],
              })(
                <Select labelInValue={true}>
                  <Option key={"1"}>水库大坝</Option>
                  <Option key={"2"}>隧洞</Option>
                  <Option key={"3"}>桥梁</Option>
                  <Option key={"4"}>铁路</Option>
                  <Option key={"5"}>地铁</Option>
                  <Option key={"6"}>其他</Option>
                </Select>
              )}
            </Item>
            <Item label={"项目介绍"} {...formItemLayout}>
              {getFieldDecorator("projectDesc", {
                rules: [
                  {
                    required: true,
                    message: "项目介绍不能为空",
                  },
                ],
              })(<Input.TextArea />)}
            </Item>
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
            <Item
              extra={"现场情况请输入仪器类型、位置、供电情况、通信情况等"}
              label={"现场情况"}
              {...formItemLayout}
            >
              <div className={"rich-wrap"}>
                {getFieldDecorator("scene", {
                  validateTrigger: "onBlur",
                  initialValue: this.state.scene,
                  rules: [
                    {
                      required: true,
                      message: "现场情况不能为空",
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback("请填写现场情况")
                        } else {
                          callback()
                        }
                      },
                    },
                  ],
                })(<BraftEditor />)}
              </div>
            </Item>

            <Item label={"项目建议"} {...formItemLayout}>
              {getFieldDecorator("projectAdvice", {
                rules: [
                  {
                    message: "项目建议不能为空",
                  },
                ],
              })(<Input.TextArea />)}
            </Item>
            <Item
              label={"上传附件"}
              extra={
                this.state.fileList.length > 0
                  ? null
                  : "最多上传一个附件，附件大小在100M以内"
              }
              {...formItemLayout}
            >
              {getFieldDecorator(
                "attachment",
                {}
              )(
                <Upload {...uploadProps}>
                  {this.state.fileList.length > 0 ? null : uploadButton}
                </Upload>
              )}
            </Item>
          </Form>
        </Col>
        <Col span={4} />
      </Row>
    )
  }
}

export let Editor = Form.create()(AddForm)
