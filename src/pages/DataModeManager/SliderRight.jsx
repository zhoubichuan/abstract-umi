import React, { Component } from "react"
import { GlobalTheSlider } from "../../components/global/GlobalTheSlider.jsx"
import ViewDetail from "./View/Detail.jsx"
import EditDetail from "./Edit/Detail.jsx"
import CreateDetail from "./Create/Detail.jsx"

let ThemeContext = React.createContext()

class TheSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewVisible: this.props.viewVisible,
      editVisible: this.props.editVisible,
      mode: this.props.mode,
      item: this.props.item,
      isCreate: this.props.isCreate,
    }
  }
  static contextType = ThemeContext
  componentWillReceiveProps(nextProps) {
    this.setState({
      viewVisible: nextProps.viewVisible,
      mode: nextProps.mode,
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
          {this.state.mode.includes("view") && (
            <ViewDetail
              save={this.save}
              item={this.state.item}
              categories={this.state.categories}
              tags={this.state.tags}
            />
          )}
          {/* {this.state.mode.includes("eidt") && (
            <EditDetail
              save={this.save}
              item={this.state.item}
              categories={this.state.categories}
              tags={this.state.tags}
            />
          )}
          {this.state.mode.includes("create") && (
            <CreateDetail
              save={this.save}
              item={this.state.item}
              categories={this.state.categories}
              tags={this.state.tags}
            />
          )} */}
        </GlobalTheSlider>
      </ThemeContext.Provider>
    )
  }
}

export let SliderRight = TheSlider
