---
title: Slider
nav:
  path: /components
---

# Slider

```tsx
import { Slider } from 'myselfantd';
import React from 'react';

const formatter = (value: number) => `${value}%`;

const App: React.FC = () => (
  <>
    <Slider tipFormatter={formatter} />
    <Slider tipFormatter={null} />
  </>
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
