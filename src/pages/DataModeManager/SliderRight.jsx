import React, { Component } from "react"
import { GlobalTheSlider } from "./GlobalTheSlider.jsx"

let ThemeContext = React.createContext()

class TheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: this.props.mode,
      item: this.props.item,
    }
  }
  static contextType = ThemeContext
  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode,
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
    let value = {
      save: this.save,
      item: this.state.item,
      categories: this.state.categories,
      tags: this.state.tags,
    }
    console.log(this.state.mode, "this.state.mode")
    return (
      <ThemeContext.Provider value={value}>
        <GlobalTheSlider
          mode={this.state.mode}
          item={this.state.item}
          categories={this.state.categories}
          tags={this.state.tags}
        ></GlobalTheSlider>
      </ThemeContext.Provider>
    )
  }
}

export let SliderRight = TheSlider
