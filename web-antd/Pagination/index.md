---
title: Pagination
nav:
  path: /components
---

# Pagination

```tsx
import { Pagination } from 'myselfantd';
import React from 'react';

const App: React.FC = () => <Pagination defaultCurrent={6} total={500} />;

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
