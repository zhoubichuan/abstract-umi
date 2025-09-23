import { Form } from 'antd';
import type { FormItemProps } from 'antd';
import React from 'react';
const App: React.FC<FormItemProps> = (props) => {
  return <Form.Item {...props}>{props.children}</Form.Item>;
};
export default App;
