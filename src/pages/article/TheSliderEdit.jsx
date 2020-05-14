import React, { Component } from "react"
import { GlobalTheSlider } from "../../components/global/GlobalTheSlider.jsx"
import Detail from "./Detail.jsx"

let ThemeContext = React.createContext()

class TheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewVisible: this.props.viewVisible,
      editVisible: this.props.editVisible,
      item: this.props.item,
      isCreate: this.props.isCreate,
    }
  }
  static contextType = ThemeContext
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
    let value = {
      save: this.save,
      viewVisible: this.state.viewVisible,
      item: this.state.item,
      editVisible: this.state.editVisible,
      categories: this.state.categories,
      tags: this.state.tags,
      isCreate: this.state.isCreate,
    }
    return (
      <ThemeContext.Provider value={value}>
        <GlobalTheSlider
          viewVisible={this.state.viewVisible}
          item={this.state.item}
          editVisible={this.state.editVisible}
          categories={this.state.categories}
          tags={this.state.tags}
          isCreate={this.state.isCreate}
        >
          <Detail
            save={this.save}
            viewVisible={this.state.viewVisible}
            item={this.state.item}
            editVisible={this.state.editVisible}
            categories={this.state.categories}
            tags={this.state.tags}
            isCreate={this.state.isCreate}
          />
        </GlobalTheSlider>
      </ThemeContext.Provider>
    )
  }
}

export let TheSliderEdit = TheSlider
