import React, { Fragment, Component } from "react"
import { Tabs, Button, Col } from "antd"
import BaseInfo from "./tabs/BaseInfo.jsx"
import Attribute from "./tabs/Attribute.jsx"
import Editor from "./tabs/Editor.jsx"
import History from "./tabs/History.jsx"
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: "baseInfo",
      item: this.props.item,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
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
  render() {
    console.log(1111111111111, "mode")
    return (
      <Fragment>
        <Tabs className="common-tabs view">
          <Tabs.TabPane
            className="common-tabpane"
            tab="基本信息"
            key="baseInfo"
            closable={false}
          >
            <BaseInfo save={this.save} item={this.state.item} />
          </Tabs.TabPane>
          <Tabs.TabPane
            className="common-tabpane"
            tab="数据模型项属性"
            key="attribute"
            closable={true}
          >
            <Attribute />
          </Tabs.TabPane>
          <Tabs.TabPane
            className="common-tabpane"
            tab="内容编辑"
            key="content"
            closable={true}
          >
            <Editor />
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
