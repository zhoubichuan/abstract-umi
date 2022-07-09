import React, { Fragment, Component } from "react"
import { Tabs } from "antd"
// import { CloseOutlined } from "@ant-design/icons"
import ViewDetail from "./View/Detail"
import EditDetail from "./Edit/Detail"
import CreateDetail from "./Create/Detail"
import ThemeContext from "./ThemeContext"

export class GlobalTheSlider extends Component {
  constructor(props) {
    super(props)
    let { mode, item } = props
    this.state = {
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
  handleCloseTabs = () => {
    this.props.handleCloseTabs()
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }
  render() {
    let tabsItem = this.context
    return (
      <Fragment>
        <div
          className="global-slider"
          style={{
            display: Object.values(tabsItem).length ? "block" : "none",
          }}
        >
          {/* <CloseOutlined
            className="slider-ico"
            onClick={this.handleCloseTabs}
          /> */}
          <Tabs
            onChange={this.onChange}
            activeKey={
              this.state.activeKey ||
              (Object.values(tabsItem)[0] &&
                Object.values(tabsItem)[Object.values(tabsItem).length - 1].key)
            }
            type="editable-card"
            onEdit={this.onEdit}
            className="slider-tabs"
          >
            {Object.keys(tabsItem).map((key) => {
              let item = tabsItem[key]
              if (item.type.includes("view")) {
                return (
                  <Tabs.TabPane
                    className="slider-tabpane"
                    tab={item.title}
                    key={item.key}
                  >
                    <ViewDetail
                      item={item.item}
                      categories={item.categories}
                      tags={item.tags}
                    />
                  </Tabs.TabPane>
                )
              }
              if (item.type.includes("edit")) {
                return (
                  <Tabs.TabPane
                    className="slider-tabpane"
                    tab={item.title}
                    key={item.key}
                  >
                    <EditDetail
                      save={this.save}
                      item={item.item}
                      categories={item.categories}
                      tags={item.tags}
                    />
                  </Tabs.TabPane>
                )
              }
              if (item.type.includes("create")) {
                return (
                  <Tabs.TabPane
                    className="slider-tabpane"
                    tab={"创建模型"}
                    key={item.key}
                  >
                    <CreateDetail
                      save={this.save}
                      item={item.item}
                      categories={item.categories}
                      tags={item.tags}
                    />
                  </Tabs.TabPane>
                )
              }
            })}
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
