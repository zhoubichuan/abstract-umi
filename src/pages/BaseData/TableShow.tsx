import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { message, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import treeDataService from '@/services/treedata';
import { EditTwoTone, MessageTwoTone } from '@ant-design/icons';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


const App: React.FC = (props, ref) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const handleSearch = (params) => {
    setLoading(true)
    treeDataService
      .query({
        curPage: 1,
        pageSize: 20,
      })
      .then(res => {
        setLoading(false)

        if (res?.code == 0) {
          const { data, pageNum: current, pageSize, total } = res;
          setDataSource(data);
          // this.setState({
          //   items: items.map(
          //     (item, index) => (
          //       ((item.index = index + 1), (item.key = item._id)), item
          //     ),
          //   ),
          //   pagination: {
          //     current,
          //     pageSize,
          //     total,
          //     showQuickJumper: true,
          //     showTotal: total => `共计${total}条`,
          //     onChange: this.pageChange,
          //   },
          // });
        } else {
          message.error(res?.data);
        }
      });
  };


  const columns: TableColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      fixed: 'left',
    },
      {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
    },
    {
      title: 'label',
      dataIndex: 'label',
      key: 'label',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => (
        <a
          onClick={() => props.view(record)}
          className={'text-ellipsis'}
          title={text}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'value',
      dataIndex: 'value',
      key: 'value',
      render: text => (
        <div className={'text-ellipsis'} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'descript',
      dataIndex: 'descript',
      key: 'descript',
      render: text => (
        <div className={'text-ellipsis'} title={text}>
          {text}
        </div>
      ),
    },

    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'node',
      dataIndex: 'node',
      key: 'node',
    },
    {
      title: 'parent',
      dataIndex: 'parent',
      key: 'parent',
    },
    {
      title: 'hasChildren',
      dataIndex: 'hasChildren',
      key: 'hasChildren',
      render: text => (
        <div >
          {text ? '是' : "否"}
        </div>
      ),
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
      sorter: (a, b) => a.creator.length - b.creator.length,
      render: text => (
        <div className={'text-ellipsis'} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'creatTime',
      key: 'createAt',
      sorter: (a, b) => a.creatTime.length - b.creatTime.length,
      // render: text => moment(text).fromNow(),
    },
    {
      title: '更新者',
      dataIndex: 'updater',
      key: 'updater',
      sorter: (a, b) => a.updater.length - b.updater.length,
      render: text => (
        <div className={'text-ellipsis'} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      sorter: (a, b) => a.updateTime.length - b.updateTime.length,
      // render: text => moment(text).fromNow(),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <div className="icons-list">
            <EditTwoTone onClick={() => props.edit(record)} />
          </div>
        );
      },
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useImperativeHandle(ref, () => ({
    search: handleSearch
  }))
  return (
    <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
  );
};

export default forwardRef(App);