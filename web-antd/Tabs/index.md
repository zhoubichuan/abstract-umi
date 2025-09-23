---
title: Tabs
nav:
  path: /components
---

# Tabs

```tsx
import { Tabs } from 'myselfantd';
import React from 'react';

const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};

const App: React.FC = () => (
  <div>
    <Tabs defaultActiveKey="1" onChange={onChange}>
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  </div>
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
