/* eslint-disable react/prop-types */
import { Steps } from 'antd';
import type { StepsProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<StepsProps> & {
  Step: any;
} = (props) => {
  let { children } = props;
  return (
    <Steps {...props}>
      {React.Children.map(children, (child, i) => {
        const childElement = child as React.FunctionComponentElement<any>;
        return React.cloneElement(childElement, {
          key: i,
        });
      })}
    </Steps>
  );
};
App.Step = Steps.Step;
export default App;
