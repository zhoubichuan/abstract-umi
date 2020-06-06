import React, { Component } from "react"
import { GlobalTheSlider } from "./GlobalTheSlider.jsx"

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
