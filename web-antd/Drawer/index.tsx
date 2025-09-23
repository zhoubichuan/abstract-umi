import { Drawer, Spin } from 'antd';
import type { DrawerProps } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
type viewmode = 'view' | 'add' | 'edit';
interface Props {
  viewmode?: viewmode;
  padding?: number;
  render?: Function;
  request?: Function;
  reload?: any;
}
const App: React.FC<DrawerProps & Props> = (props) => {
  let { viewmode, children, padding = true, render, request, reload, ...restProps } = props;
  let className = classNames(styles.drawer);
  let [data, setData] = useState();
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    if (request && render) {
      let result = await request();
      setData(result);
    }
  };
  if (request && render) {
    return (
      <Drawer className={className} destroyOnClose getContainer={false} autoFocus {...props}>
        {data ? (
          React.Children.map(render(data), (child: any, i: number) => {
            const childElement = child as React.FunctionComponentElement<any>;
            return React.cloneElement(childElement, {
              viewmode: childElement.props.viewmode,
              data: childElement.props.data,
              key: i
            });
          })
        ) : (
          <Spin />
        )}
      </Drawer>
    );
  } else {
    return (
      <Drawer className={className} destroyOnClose getContainer={false} autoFocus {...props}>
        {render
          ? render()
          : React.Children.map(children, (child, i) => {
              const childElement = child as React.FunctionComponentElement<any>;
              return React.cloneElement(childElement, {
                viewmode: viewmode,
                key: i
              });
            })}
      </Drawer>
    );
  }
};
App.defaultProps = {
  reload: false
};
export default App;
