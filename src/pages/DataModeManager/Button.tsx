import { Component } from "react"
import { Button } from "antd"
export default class ComButton extends Component {
  handleCreate = () => {
    // let itemValue = {
    //   type: "create",
    //   title: "创建",
    //   key: "create",
    //   item: { key: "create" },
    //   categories: this.state.categories,
    //   tags: this.state.tags,
    // }
    // let tabsItem = this.state.tabsItem
    // itemValue.key && (tabsItem[itemValue.key] = itemValue)
    // this.setState({
    //   tabsItem,
    // })
  }
  handleClick = () => {}
  render() {
    return (
      <Button.Group>
        <Button type="primary" icon="plus-circle" onClick={this.handleClick}>
          创建
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="danger"
          icon="minus-circle"
          // onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
        >
          删除
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="danger"
          icon="download"
          className="export-table"
        >
          预发布
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="danger"
          icon="download"
          className="export-table"
        >
          发布
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="danger"
          icon="download"
          className="export-table"
        >
          失效
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="danger"
          icon="download"
          className="export-table"
        >
          作废
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="danger"
          icon="download"
          className="export-table"
        >
          导出表格
        </Button>
      </Button.Group>
    )
  }
}
