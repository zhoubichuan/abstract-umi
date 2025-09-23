---
title: Modal
nav:
  path: /components
---

# Modal

```tsx
import { Button, Modal } from 'myselfantd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default App;
```

## Dialog 弹框

```tsx
/**
 * title: 弹框类型
 */
import { Button, Space, Modal } from 'myselfantd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { createRef, useState } from 'react';

const App: React.FC = () => {
  let searchRef = createRef<any>();
  const [showDialod, setVisible] = useState(false);
  const changeDialog = (state: boolean) => {
    setVisible(state);
  };
  return (
    <>
      <Button onClick={() => changeDialog(true)}>弹框</Button>
      <Modal.Dialog showDialod={showDialod} changeDialog={changeDialog}>
        <div>
          <img src={''} alt="" />
          <div>
            <p>拖拉机001：编号</p>
            <ul>
              <li>一级故障名称，请xxx</li>
              <li>一级故障名称，请xxx</li>
              <li>一级故障名称，请xxx</li>
            </ul>
          </div>
        </div>
      </Modal.Dialog>
    </>
  );
};

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/Modal-cn/
