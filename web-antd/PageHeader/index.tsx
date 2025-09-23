import { PageHeader } from 'antd';
import type { PageHeaderProps } from 'antd';
import React from 'react';

const App: React.FC<PageHeaderProps> = (props) => (
  <PageHeader {...props}>{props.children}</PageHeader>
);

export default App;
