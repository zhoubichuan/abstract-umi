/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Form, Table, Modal } from '..';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, {
  createRef,
  useEffect,
  useState,
  memo,
  useMemo,
  useCallback,
  useRef,
  useImperativeHandle
} from 'react';
import styles from './index.module.scss';
import _ from 'lodash';

// table变化
// 搜索变化
// 分页变化
interface Search {
  template: any;
  data: any;
  button: any;
}
interface TableI {
  template: any;
  data: any;
  attrs: any;
}
interface Props {
  reload?: number;
  reSearch?: number;
  search: Search;
  table: TableI;
  request?: (...params: any) => void;
  onChange?: (...params: any) => void;
  pageContentRef?: any;
}
const App: React.FC<Props> = memo((props) => {
  let {
    reload = 0,
    reSearch = 0,
    search: { template: searchTemplate, data: searchData, button, ...restSearchProps } = {
      template: [],
      data: [],
      button: []
    },
    table: {
      template: tableTemplate = [],
      data: initTableData = {
        data: [],
        page: { total: 0, pageSize: 20, current: 1 }
      },
      attrs
    },
    request,
    pageContentRef
  } = props;
  let {
    data,
    page: { total, pageSize, current }
  } = initTableData;
  let searchRef = createRef<any>();
  const [formColumns, setFormColumns] = useState(searchTemplate);
  const [tableData, setTableData] = useState(initTableData);
  // const [loading, setLoading] = useState(true);
  // const [searchParams, setSearchParams] = useState({});
  const searchParams = useRef<any>({});
  const tableRef = createRef<any>();
  useEffect(() => {
    setTableData({
      //入口1
      data: [...data],
      page: { total, pageSize, current }
    });

    console.log(data, total, pageSize, current, 'search auto', props.search);
    tableRef.current.setLoading(false);
  }, [data, total, pageSize, current]);
  useEffect(() => {
    //无搜索框，进入页面第一次搜索
    requestFn({}, {});
  }, [reload, reSearch]);
  const requestFn = async (params: any = {}, page: any = {}) => {
    searchParams.current = params;
    let { total, pageSize, current } = tableData.page;
    let pageParams = {
      total: page.total || total,
      pageSize: page.pageSize || pageSize,
      current: page.current || current
    };
    console.log('搜索参数：', params, '分页参数：', pageParams);
    tableRef.current?.setLoading(true);
    if (request) {
      //入口2
      let data = await request(pageParams, params);
      setTableData(data);
      tableRef.current?.setLoading(false);
    }
  };
  console.log('----initTableData---', tableData);

  useImperativeHandle(pageContentRef, () => {
    return { handleSearch: requestFn };
  });
  return (
    <div className={styles.content}>
      {props.search && (
        <Form.Search
          columns={useMemo(() => formColumns, [formColumns])}
          requestFn={useCallback(requestFn, [tableRef])}
          {...restSearchProps}>
          {button && button.length && (
            <div className={styles.searchButton}>
              {React.Children.map(button, (child, i) => {
                const childElement = child as React.FunctionComponentElement<any>;
                return React.cloneElement(childElement, {
                  key: i
                });
              })}
            </div>
          )}
        </Form.Search>
      )}
      <Table.Pagination
        rowKey={(record: any, index: number) => index}
        tableData={tableData}
        columns={useMemo(() => tableTemplate.filter((item: any) => item), [tableTemplate])}
        onChange={(pagination: any, filters: any, sorter: any, extra: any) => {
          // 分页修改触发搜索，分页参数传递+搜索参数,当前页为第一页
          tableRef.current.setLoading(true);
          let { current, pageSize } = pagination;
          console.log('搜索参数2：', searchParams.current, '分页参数2：', { current, pageSize });
          requestFn(searchParams.current, {
            current: current,
            pageSize: pageSize
          });
        }}
        onTableRef={tableRef}
        {...attrs}
      />
    </div>
  );
});
App.displayName = 'PageContent';
export default App;
// onChange --> search -->requestFn (请求) --> setData
