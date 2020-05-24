import React from "react"
import { Table, Button } from "antd"

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
  }

  start = () => {
    this.setState({ loading: true })
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      })
    }, 1000)
  }

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    const { loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    return (
      <div>
        系统基本属性
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            新增
          </Button>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            删除
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    )
  }
}

export default App
