/* eslint-disable react/prop-types */
import { Card } from 'antd';
import type { CardProps } from 'antd';
import Meta from './Meta';
import Checkbox from './Checkbox';
import styles from './index.module.scss';
import React from 'react';
import classNames from 'classnames';
interface Props {
  border?: number;
  height?: number;
}
interface Attrs {
  Meta: typeof Meta;
  Checkbox: typeof Checkbox;
}
const App: React.FC<CardProps & Props> & Attrs = (props) => {
  let { border, children, height = false, ...restProps } = props;
  let className = classNames(styles.card, {
    [styles.border]: !border,
    [styles.height]: height,
  });
  return (
    <div className={className}>
      <Card {...props}>
        {React.Children.map(children, (child, i) => {
          const childElement = child as React.FunctionComponentElement<any>;
          return React.cloneElement(childElement, {
            key: i,
          });
        })}
      </Card>
    </div>
  );
};
App.Checkbox = Checkbox;
App.Meta = Meta;
export default App;
