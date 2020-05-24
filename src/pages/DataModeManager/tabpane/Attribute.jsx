import React from "react"
import { Table, Button, Modal } from "antd"
import AttributeDialog from "./AttributeDialog.jsx"

const columns = [
  {
    title: "中文名称",
    dataIndex: "nameCn",
  },
  {
    title: "英文名称",
    dataIndex: "nameEn",
  },
  {
    title: "属性类型",
    dataIndex: "type",
  },
]

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    nameCn: `Edward King ${i}`,
    nameEn: 32,
    type: `London, Park Lane no. ${i}`,
  })
}

class App extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    isAddAttribute: false,
  }

  addAttribute = () => {
    this.setState({ isAddAttribute: true })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  deleteAttribute = () => {}
  render() {
    const { loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <div>
        系统基本属性
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.addAttribute} loading={loading}>
            新增
          </Button>
          <Button type="primary" onClick={this.deleteAttribute}>
            删除
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
        <AttributeDialog visible={this.state.isAddAttribute} />
      </div>
    )
  }
}

export default App
