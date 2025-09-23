---
title: Divider
nav:
  path: /components
---

# Divider

```tsx
import { Divider } from 'myselfantd';
import React from 'react';

const App: React.FC = () => (
  <>
    <p>aaaaaaaaaaaa</p>
    <Divider plain>Text</Divider>
    <p>bbbbbbbbbbb</p>
    <Divider orientation="left" plain>
      Left Text
    </Divider>
    <p>cccccccccc</p>
    <Divider orientation="right" plain>
      Right Text
    </Divider>
    <p>dddddddddd</p>
  </>
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
