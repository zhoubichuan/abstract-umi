import React, { Fragment, Component } from "react"
// import { connect } from "react-redux"
import { Tabs } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import ViewDetail from "./View/Detail.jsx"
import EditDetail from "./Edit/Detail.jsx"
import CreateDetail from "./Create/Detail.jsx"

export class GlobalTheSlider extends Component {
  constructor(props) {
    super(props)
    let { mode, item } = props
    const tabsItem = [
      {
        type: "view",
        child: [],
      },
      {
        type: "edit",
        child: [],
      },
      {
        type: "create",
        child: [],
      },
    ]
    tabsItem.find((item) => item.type.includes(mode)).child.push(item)
    this.state = {
      tabsItem: tabsItem,
      activeKey: tabsItem[0].child[0].key,
      mode: this.props.mode,
      item: this.props.item,
    }
    console.log(tabsItem, "tabsItemtabsItemtabsItem")
    this.renderChild = this.renderChild.bind(this)
  }
  onChange = (activeKey) => {
    this.setState({ activeKey })
  }
  componentWillReceiveProps(nextProps) {
    let { mode, item } = nextProps,
      tabsItem = this.state.tabsItem
    tabsItem.find((item) => item.type.includes(mode)).child.push(item)
    this.setState({
      tabsItem: tabsItem,
    })
  }
  handleCloseTabs = () => {
    this.setState({
      mode: "",
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
  }
  render() {
    console.log(this.state.tabsItem, "tabsItem")
    return (
      <Fragment>
        <div
          className="global-slider"
          style={{
            display: this.state.mode ? "block" : "none",
          }}
        >
          <CloseOutlined
            className="slider-ico"
            onClick={this.handleCloseTabs}
          />
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
            className="slider-tabs"
          >
            {this.state.tabsItem.map((tabs) =>
              tabs.child.map((item) => {
                console.log(tabs.type)
                if (tabs.type.includes("view")) {
                  return (
                    <Tabs.TabPane
                      className="slider-tabpane"
                      tab={item.title}
                      key={item.key}
                    >
                      <ViewDetail
                        save={this.save}
                        item={this.state.item}
                        categories={this.state.categories}
                        tags={this.state.tags}
                      />
                    </Tabs.TabPane>
                  )
                }
                if (tabs.type.includes("edit")) {
                  return (
                    <Tabs.TabPane
                      className="slider-tabpane"
                      tab={item.title}
                      key={item.key}
                    >
                      <EditDetail
                        save={this.save}
                        item={this.state.item}
                        categories={this.state.categories}
                        tags={this.state.tags}
                      />
                    </Tabs.TabPane>
                  )
                }
                if (tabs.type.includes("create")) {
                  return (
                    <Tabs.TabPane
                      className="slider-tabpane"
                      tab={"创建模型"}
                      key={item.key}
                    >
                      <CreateDetail
                        save={this.save}
                        item={this.state.item}
                        categories={this.state.categories}
                        tags={this.state.tags}
                      />
                    </Tabs.TabPane>
                  )
                }
              })
            )}

            {/* {Array.isArray(this.props.children)
              ? this.props.children.map((child, key) => {
                  return this.renderChild(child, key)
                })
              : this.props.children && this.renderChild(this.props.children, 1)} */}
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
