import React, { Component } from "react"
import { GlobalTheSlider } from "./GlobalTheSlider"

/** tagManager 右侧区域入口，透传关闭页签回调。 */
class TheSlider extends Component {
  render() {
    return (
      <GlobalTheSlider
        handleCloseTabs={this.props.handleCloseTabs}
      ></GlobalTheSlider>
    )
  }
}

export let SliderRight = TheSlider
