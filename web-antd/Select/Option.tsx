import { Select } from 'antd';
import { OptionProps } from 'rc-select/lib/Option';
import React from 'react';

const App: React.FC<OptionProps> = (props) => {
  let { children } = props;
  return (
    <Select.Option {...props}>
      {React.Children.map(children, (child, i) => {
        const childElement = child as React.FunctionComponentElement<any>;
        return React.cloneElement(childElement, {
          key: i,
        });
      })}
    </Select.Option>
  );
};
export default App;
