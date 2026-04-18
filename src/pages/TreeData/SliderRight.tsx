import { GlobalTheSlider } from "./GlobalTheSlider"
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import React, { useState, useImperativeHandle, forwardRef } from 'react';

/**
 * TreeData 右侧抽屉容器：
 * 统一承载 GlobalTheSlider 并通过 ref 控制显示。
 */
const App: React.FC = (props, ref) => {
  const [visible, setVisible] = useState(false);
  /** 关闭抽屉。 */
  const onClose = () => {
    setVisible(false);
  };
  /** 暴露给父组件的“打开抽屉”方法。 */
  useImperativeHandle(ref, () => ({
    handleCreate: () => {
      setVisible(true);
    }
  }))
  return (
    <Drawer
      title="Drawer with extra actions"
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
  );
};

export default forwardRef(App);