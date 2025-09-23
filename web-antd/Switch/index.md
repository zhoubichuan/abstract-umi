---
title: Switch
nav:
  path: /components
---

# Switch

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Switch } from 'myselfantd';
import React from 'react';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const App: React.FC = () => (
  <div>
    <Switch defaultChecked onChange={onChange} />
  </div>
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
