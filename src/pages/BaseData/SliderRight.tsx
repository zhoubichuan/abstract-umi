import GlobalTheSlider from "./GlobalTheSlider"
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import React, { useState, useImperativeHandle, forwardRef } from 'react';

const App: React.FC = (props, ref) => {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  useImperativeHandle(ref, () => ({
    handleCreate: () => {
      setVisible(true);
    }
  }))
  return (
    <>
      <Drawer
        title="编辑数据"
        placement={'right'}
        width={1000}
        onClose={onClose}
        visible={visible}
      >
        <GlobalTheSlider
          handleCloseTabs={props.handleCloseTabs}
        >
        </GlobalTheSlider>
      </Drawer>
    </>
  );
};

export default forwardRef(App);