import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import React from 'react';

const App: React.FC<any> = (props) => {
  let { children } = props;
  return <Checkbox.Group {...props}>{children}</Checkbox.Group>;
};

export default App;
