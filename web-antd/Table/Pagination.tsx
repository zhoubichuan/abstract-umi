/* eslint-disable react/prop-types */
import { Table } from 'antd';
import type { TableProps } from 'antd'; //eslint-disable-line
import React, { memo, useImperativeHandle, useRef, useState } from 'react';
import styles from './index.module.scss';

interface tableProps {
  tableData: any;
  onChange: any;
  columns: any;
  className?: any;
  y?: number;
  components?: any;
  rowKey?: any;
  onTableRef?: any;
}
const App: React.FC<tableProps> = memo((props) => {
  let {
    y,
    columns,
    onChange,
    tableData: { data = [], page },
    onTableRef,
    ...rest
  } = props;
  const [loading, setLoading] = useState(true);
  useImperativeHandle(onTableRef, () => {
    return {
      setLoading: (val: boolean) => {
        if (val) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          setLoading(false);
        }
      }
    };
  });
  return (
    <div className={styles.pagination}>
      <Table
        loading={loading}
        rowKey={(record: any, index: number) => index}
        key="pagination"
        scroll={{ scrollToFirstRowOnChange: true, y: y || 536 }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{
          locale: {
            items_per_page: '条/页',
            jump_to: '跳至',
            page: '页'
          },
          className: 'tablePagination',
          total: +page.total,
          pageSize: +page.pageSize,
          showSizeChanger: true,
          current: +page.current,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `共 ${total} 条数据`
        }}
        {...rest}
      />
    </div>
  );
});
App.displayName = 'Pagination';
export default App;
