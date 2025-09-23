/* eslint-disable react/prop-types */
import { Card, Tabs } from '..';
import PageContent from './PageContent';
import styles from './index.module.scss';
import React, { useMemo, memo, createRef, useCallback, useRef, useImperativeHandle } from 'react';
import classnames from 'classnames';
interface Table {
  template: string[];
  data?: any;
  attrs?: any;
}
interface PageProps {
  title: string;
  search: any;
  table: Table;
  request?: (...params: any) => void;
  tabBarExtraContent?: any;
  height?: number;
  reload?: number;
  reSearch?: number;
  pageRef?: any;
}
const App: React.FC<PageProps> = memo((props) => {
  let {
    reSearch = 0,
    title,
    search = { template: [], data: [], button: [] },
    table: {
      template = [],
      data = {
        data: [],
        page: { total: 0, pageSize: 20, current: 1 }
      },
      attrs
    },
    request,
    tabBarExtraContent,
    height = 1,
    pageRef
  } = props;
  let classname = classnames(styles.pageTemplate);
  const onPageContentRef = useRef<any>();
  const handleSearch = (searchParams?: any, pageParams?: { current: any; pageSize: any }) => {
    onPageContentRef.current?.handleSearch(searchParams, pageParams);
  };

  useImperativeHandle(pageRef, () => {
    return { handleSearch: handleSearch };
  });
  return (
    <Card className={classname} height={height}>
      <Tabs defaultActiveKey="1" tabBarExtraContent={tabBarExtraContent}>
        <Tabs.TabPane tab={title} key="1">
          <PageContent
            pageContentRef={onPageContentRef}
            reSearch={reSearch}
            search={search}
            table={{ template, data: data, attrs }}
            request={request}
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
});
App.displayName = 'PageTemplate';
export default App;
