---
title: Steps
nav:
  path: /components
---

# Steps

```tsx
import { Steps } from 'myselfantd';
import React from 'react';

const { Step } = Steps;

const App: React.FC = () => (
  <Steps size="small" current={1}>
    <Step title="Finished" />
    <Step title="In Progress" />
    <Step title="Waiting" />
  </Steps>
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
