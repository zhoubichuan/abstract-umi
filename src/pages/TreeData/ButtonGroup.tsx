import { Button, message } from "antd"
import { DownloadOutlined } from '@ant-design/icons';
import articleService from '@/services/treedata';

const App: React.FC = (props) => {
  const { handleCreate, handleDelete, handleExport, handleImport } = props
  // const handleCreate = () => {
  //   let itemValue = {
  //     type: "create",
  //     title: "创建",
  //     key: "create",
  //     item: { key: "create" },
  //     categories: this.state.categories,
  //     tags: this.state.tags,
  //   }
  //   let tabsItem = this.state.tabsItem
  //   itemValue.key && (tabsItem[itemValue.key] = itemValue)
  //   this.setState({
  //     tabsItem,
  //   })
  // }

  const handleRemove = ids => {
    articleService.remove(ids).then(res => {
      if (res?.code == 0) {
        message.success('删除数据成功');
        // this.setState({}, this.getList());
      }
    });
  };
  return (
    <Button.Group className={'common-button'}>
      <Button type="primary" icon={<DownloadOutlined />} onClick={handleCreate}>
        创建
      </Button>
      <Button
        style={{
          marginLeft: 5,
        }}
        type="primary"
        icon={<DownloadOutlined />}
        onClick={handleDelete}
      >
        删除
      </Button>
      <Button
        style={{
          marginLeft: 5,
        }}
        type="primary"
        icon={<DownloadOutlined />}
        className="export-table"
         onClick={handleExport}
      >
        导入表格
      </Button>
      <Button
        style={{
          marginLeft: 5,
        }}
        type="primary"
        icon={<DownloadOutlined />}
        className="export-table"
         onClick={handleImport}
      >
        导出表格
      </Button>
      <Button
        style={{
          marginLeft: 5,
        }}
        type="primary"
        icon={<DownloadOutlined />}
        className="export-table"
         onClick={handleImport}
      >
        本地缓存
      </Button>
    </Button.Group>
  )
};

export default App;