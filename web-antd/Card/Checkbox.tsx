import { Card, Checkbox, Row, Col } from 'antd';
import type { CardProps } from 'antd';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
interface Filed {
  name: string;
  key: string;
  value: string;
}
interface Props {
  item?: any;
  fileld: Filed;
  title?: any;
  value?: any;
}
const App: React.FC<CardProps & Props> = (props) => {
  let { item, children, fileld, title } = props;
  let [state, setState] = useState(!!item.isAllocate);
  return (
    <div
      className={classnames(styles.checkbox, {
        [styles.selected]: state,
      })}
    >
      <Card
        title={
          title ? (
            React.Children.map(title, (child, i) => {
              const childElement = child as React.FunctionComponentElement<any>;
              return React.cloneElement(childElement, {
                item,
                key: i,
              });
            })
          ) : (
            <span className={styles.title}>{item[fileld.name]}</span>
          )
        }
        extra={
          <Checkbox
            className={styles.check}
            key={item[fileld.key]}
            checked={state}
            value={item[fileld.value]}
            onChange={(e: any) => {
              setState(e.target.checked);
            }}
          />
        }
      >
        {React.Children.map(children, (child, i) => {
          const childElement = child as React.FunctionComponentElement<any>;
          return React.cloneElement(childElement, {
            item,
            key: i,
          });
        })}
      </Card>
    </div>
  );
};
export default App;
