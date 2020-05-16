import React, { Fragment, Component } from "react"
// import { connect } from "react-redux"
import { Tabs } from "antd"
import { UploadOutlined, CloseOutlined } from "@ant-design/icons"

function callback(key) {
  console.log(key)
}
export class GlobalTheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: "1",
      viewVisible: this.props.viewVisible,
      editVisible: this.props.editVisible,
      item: this.props.item,
      isCreate: this.props.isCreate,
    }
    this.renderChild = this.renderChild.bind(this)
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
  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }
  remove = (targetKey) => {
    let { activeKey } = this.state
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter((pane) => pane.key !== targetKey)
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key
      } else {
        activeKey = panes[0].key
      }
    }
    this.setState({ panes, activeKey })
  }
  render() {
    return (
      <Fragment>
        <div
          className="global-slider"
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
            className="slider-ico"
            onClick={this.handleCloseTabs}
          />
          <Tabs
            // defaultActiveKey="1"
            activeKey={this.state.activeKey}
            type="editable-card"
            onChange={callback}
            onEdit={this.onEdit}
            className="slider-tabs"
          >
            {Array.isArray(this.props.children)
              ? this.props.children.map((child, key) => {
                  return this.renderChild(child, key)
                })
              : this.props.children && this.renderChild(this.props.children, 1)}
          </Tabs>
        </div>
      </Fragment>
    )
  }

  renderChild(child, key) {
    return (
      <Tabs.TabPane
        className="slider-tabpane"
        tab={(this.state.item && this.state.item.name) || "创建模型"}
        key={key}
      >
        {child}
      </Tabs.TabPane>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

// export default connect(mapStateToProps, mapDispatchToProps)(GlobalTheSlider)
