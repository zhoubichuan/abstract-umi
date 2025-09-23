import { Descriptions } from 'antd';
import React from 'react';
const App: React.FC<any> = (props) => (
  <Descriptions.Item {...props}>{props.children}</Descriptions.Item>
);

export default App;
