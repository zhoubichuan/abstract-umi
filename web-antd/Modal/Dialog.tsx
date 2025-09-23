/* eslint-disable no-undef */
import { Modal } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
enum sizeEnum {
  big = 1500,
  middle = 1000,
  small = 800,
}
type SIZE = keyof typeof sizeEnum;
type viewmode = 'view' | 'add' | 'edit';
interface Props {
  showDialog: boolean;
  changeDialog: Function;
  children: any;
  size?: SIZE;
  gray?: boolean;
  viewmode?: viewmode;
  title?: JSX.Element;
}
const App: React.FC<Props> = (props) => {
  let { showDialog, changeDialog, children, size = 'middle', gray = false, title } = props;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(showDialog);
  }, [showDialog]);
  let className = classNames(styles.dialog, {
    [styles.gray]: gray,
  });
  return (
    <>
      {showDialog && (
        <Modal
          className={className}
          centered
          visible={visible}
          onOk={() => changeDialog(false)}
          onCancel={() => changeDialog(false)}
          width={sizeEnum[size]}
          destroyOnClose={true}
          footer={null}
        >
          {title && <p className={styles.title}>{title}</p>}
          {React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<any>;
            return React.cloneElement(childElement, {
              key: i,
            });
          })}
        </Modal>
      )}
    </>
  );
};

export default App;
