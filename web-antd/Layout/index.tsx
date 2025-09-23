/* eslint-disable react/prop-types */
import { Layout } from 'antd';
import type { LayoutProps } from 'antd';
import './index.module.scss';
import styles from './index.module.scss';
import React from 'react';
import PageContent from './PageContent';
import TabsTemplate from './TabsTemplate';
import PageTemplate from './PageTemplate';
const { Header, Footer, Content, Sider } = Layout;
const App: React.FC<LayoutProps> & {
  Header: any;
  Footer: any;
  Content: any;
  Sider: any;
  PageContent: any;
  TabsTemplate: any;
  PageTemplate: any;
} = (props) => {
  return (
    <span className={styles.layout}>
      <Layout {...props}>{props.children}</Layout>
    </span>
  );
};
App.Header = Header;
App.Footer = Footer;
App.Content = Content;
App.Sider = Sider;
App.PageContent = PageContent;
App.TabsTemplate = TabsTemplate;
App.PageTemplate = PageTemplate;
export default App;
