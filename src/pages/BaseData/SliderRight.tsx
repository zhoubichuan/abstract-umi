import { GlobalTheSlider } from "./GlobalTheSlider"
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import React, { useState, useImperativeHandle, forwardRef } from 'react';

const App: React.FC = (props, ref) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
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
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        placement={'right'}
        width={1000}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <GlobalTheSlider
          handleCloseTabs={props.handleCloseTabs}
        ></GlobalTheSlider>
      </Drawer>
    </>
  );
};

export default forwardRef(App);