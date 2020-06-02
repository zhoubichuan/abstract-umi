import React, { Fragment, Component } from "react"
import { Tabs } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import ViewDetail from "./View/Detail.jsx"
import EditDetail from "./Edit/Detail.jsx"
import CreateDetail from "./Create/Detail.jsx"
let ThemeContext = React.createContext({})

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
    this.state = {
      tabsItem: tabsItem,
      activeKey: "",
      mode: this.props.mode,
      item: this.props.item,
    }
    this.renderChild = this.renderChild.bind(this)
  }
  static contextType = ThemeContext
  onChange = (activeKey) => {
    this.setState({ activeKey })
  }
  componentWillReceiveProps(nextProps) {
    let { mode, item } = nextProps,
      tabsItem = this.state.tabsItem
    tabsItem.find((item) => item.type.includes(mode)).child.push(item)
    this.setState({
      mode: item.key,
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
    let { mode = {}, item = {} } = this.context
    console.log(mode, item)
    let tabsItem = this.state.tabsItem
    Object.values(item).length &&
      tabsItem.find((item) => item.type.includes(mode)).child.push(item)
    return (
      <Fragment>
        <div
          className="global-slider"
          style={{
            display: mode ? "block" : "none",
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
            {tabsItem.map((tabs) =>
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
