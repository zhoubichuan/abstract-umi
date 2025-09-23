---
title: InputNumber
nav:
  path: /components
---

# InputNumber

```tsx
import { InputNumber } from 'myselfantd';
import React from 'react';

const onChange = (value: number) => {
  console.log('changed', value);
};

const App: React.FC = () => <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />;

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
