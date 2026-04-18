import GlobalTheSlider from "./GlobalTheSlider"
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import React, { useState, useImperativeHandle, forwardRef } from 'react';

type SliderRightProps = {
  handleCloseTabs?: () => void;
};

type SliderRightRef = {
  handleCreate: () => void;
};

/**
 * BaseData 右侧抽屉容器：
 * 通过 ref 暴露打开能力，内部负责抽屉显隐。
 */
const App = (props: SliderRightProps, ref: React.Ref<SliderRightRef>) => {
  const [visible, setVisible] = useState(false);
  /** 关闭抽屉并保留内部内容状态。 */
  const onClose = () => {
    setVisible(false);
  };
  /** 向父组件暴露打开抽屉的方法。 */
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
        <GlobalTheSlider></GlobalTheSlider>
      </Drawer>
    </>
  );
};

export default forwardRef<SliderRightRef, SliderRightProps>(App);