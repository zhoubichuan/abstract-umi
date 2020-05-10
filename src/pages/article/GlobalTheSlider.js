import React from "react"
import { Fragment, Component } from "react"
import { connect } from "react-redux"
import "./index.scss"
import { Icon, Button } from "antd"

class GlobalTheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.renderChild = this.renderChild.bind(this)
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
            defaultActiveKey="1"
            onChange={callback}
            className="slider-tabs"
          >
            {this.props.children.map((child, key) => {
              return this.renderChild(child, key)
            })}
          </Tabs>
          <div className="pop-footer">
            <Button.Group>
              <Button size="small" className="cancel">
                取消
              </Button>
              <Button size="small" type="primary" className="confirm">
                确定
              </Button>
            </Button.Group>
          </div>
        </div>
      </Fragment>
    )
  }

  renderChild(child, key) {
    return (
      <Tabs.TabPane
        className="slider-tabpane"
        tab={this.state.item.name || "创建模型"}
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

export default connect(mapStateToProps, mapDispatchToProps)(GlobalTheSlider)
