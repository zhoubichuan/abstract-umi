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
        uid: "-1",
        name: "image.png",
        status: "done",
        url: img,
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url: img,
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url: img,
      },
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url: img,
      },
      {
        uid: "-5",
        name: "image.png",
        status: "error",
      },
    ],
  }

  handleCancel = () => this.setState({ previewVisible: false })

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
export class TheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editVisible: this.props.visible,
      item: this.props.item,
      isCreate: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ editVisible: nextProps.visible, item: nextProps.item })
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
    const layout = {
      justify: "center",
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const layoutItem = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    }
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
          <Tabs.TabPane tab="Tab 1" key="1" className="common-tabs">
            <Form {...layout} className="base-info">
              <Row
                gutter={20}
                style={{ overflowY: "scroll", overflowX: "hidden" }}
              >
                <Collapse defaultActiveKey={["1", "2"]}>
                  <Collapse.Panel header="基本信息" key="1">
                    <Col span={12}>
                      <Form.Item
                        label="分类"
                        name="category"
                        rules={[
                          {
                            required: true,
                            message: "请选择分类",
                          },
                        ]}
                      >
                        <Select placeholder="请选择分类">
                          {this.props.categories.map((item) => (
                            <Select.Option key={item._id} value={item._id}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="中文名称"
                        name="name"
                        rule={[
                          {
                            required: true,
                            message: "请输入中文名称",
                          },
                        ]}
                      >
                        <Input placeholder="请输入中文名称" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="英文名称"
                        name="nameEn"
                        rules={[
                          {
                            required: true,
                            message: "请输入英文名称",
                          },
                        ]}
                      >
                        <Input placeholder="请输入英文名称" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <PicturesWall />
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        {...layoutItem}
                        label="中文描述"
                        name="descript"
                        rules={[
                          {
                            required: true,
                            message: "请输入中文描述",
                          },
                        ]}
                      >
                        <Input.TextArea placeholder="请输入中文描述" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        {...layoutItem}
                        label="英文描述"
                        name="descriptEn"
                        rules={[
                          {
                            required: true,
                            message: "请输入英文描述",
                          },
                        ]}
                      >
                        <Input.TextArea placeholder="请输入英文描述" />
                      </Form.Item>
                    </Col>
                  </Collapse.Panel>
                  <Collapse.Panel header="编辑信息" key="2">
                    <Col span={12}>
                      <Form.Item
                        label="更新者"
                        name="updater"
                        rules={[
                          {
                            required: true,
                            message: "请选择更新者",
                          },
                        ]}
                      >
                        <Input placeholder="请选择更新者" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="创建者"
                        name="creater"
                        rules={[
                          {
                            required: true,
                            message: "请输入创建者",
                          },
                        ]}
                      >
                        <Input placeholder="请输入创建者" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="更新时间"
                        name="updateTime"
                        rules={[
                          {
                            required: true,
                            message: "请输入标题",
                          },
                        ]}
                      >
                        <Input placeholder="请输入标题" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="创建时间"
                        name="createTime"
                        rules={[
                          {
                            required: true,
                            message: "请输入标题",
                          },
                        ]}
                      >
                        <Input placeholder="请输入标题" />
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
