import { Component } from "react"
import { Button, message } from "antd"
import { DownloadOutlined } from '@ant-design/icons';
import articleService from '@/services/article';
export default class ComButton extends Component {
  handleCreate = () => {
    let itemValue = {
      type: "create",
      title: "创建",
      key: "create",
      item: { key: "create" },
      categories: this.state.categories,
      tags: this.state.tags,
    }
    let tabsItem = this.state.tabsItem
    itemValue.key && (tabsItem[itemValue.key] = itemValue)
    this.setState({
      tabsItem,
    })
  }
  handleRemove = ids => {
    articleService.remove(ids).then(res => {
      if (res?.code == 0) {
        message.success('删除数据成功');
        // this.setState({}, this.getList());
      }
    });
  };
  handleClick = () => { }
  render() {
    return (
      <Button.Group className={'common-button'}>
        <Button type="primary" icon={<DownloadOutlined />} onClick={this.handleCreate}>
          创建
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
        >
          删除
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
        >
          预发布
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
        >
          已发布
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
        >
          修订
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
        >
          失效
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => this.handleRemove(this.state.selectedRowkKeys)}
        >
          作废
        </Button>
        <Button
          style={{
            marginLeft: 5,
          }}
          type="primary"
          icon={<DownloadOutlined />}
          className="export-table"
        >
          导出表格
        </Button>
      </Button.Group>
    )
  }
}
