import React, { Fragment, Component } from "react"
import { Tabs, Button, Col } from "antd"
import BaseInfo from "./tabpane/BaseInfo.jsx"
import Attribute from "./tabpane/Attribute.jsx"
// import Editor from "./tabpane/Editor.jsx"
import History from "./tabpane/History.jsx"
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: "baseInfo",
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
    return (
      <Fragment>
        <Tabs className="common-tabs">
          <Tabs.TabPane
            className="common-tabpane"
            tab="基本信息"
            key="baseInfo"
            closable={false}
          >
            <BaseInfo
              save={this.save}
              viewVisible={this.state.viewVisible}
              editVisible={this.state.editVisible}
              isCreate={this.state.isCreate}
              item={this.state.item}
            />
          </Tabs.TabPane>
          {/* <Tabs.TabPane
            className="common-tabpane"
            tab="内容编辑"
            key="content"
            closable={true}
          >
            <Editor />
          </Tabs.TabPane> */}
          <Tabs.TabPane
            className="common-tabpane"
            tab="属性"
            key="attribute"
            closable={true}
          >
            <Attribute />
          </Tabs.TabPane>
          <Tabs.TabPane
            className="common-tabpane"
            tab="历史记录"
            key="history"
            closable={true}
          >
            <History />
          </Tabs.TabPane>
        </Tabs>
        <Col className="tabs-button">
          <Button type="primary">编辑</Button>
          <Button style={{ marginLeft: "20px" }} onClick={this.handleCloseTabs}>
            修改
          </Button>
        </Col>
      </Fragment>
    )
  }
}
export default Detail
