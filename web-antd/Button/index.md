---
title: Button
nav:
  path: /components
---

# Button

## 1.默认按钮

```tsx
/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮(实际用不到)、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
import { Button, ConfigProvider } from 'myselfantd';
import React from 'react';
const margin = {
  marginRight: 20,
};
const App: React.FC = () => {
  return (
    <>
      <Button type="primary" size="large" style={margin}>
        保 存
      </Button>
      <Button type="default" size="large" style={margin}>
        取 消
      </Button>
      <Button type="link" style={margin}>
        编辑
      </Button>
      <Button type="link" style={margin}>
        查看
      </Button>
    </>
  );
};
export default App;
```

## 2.评分按钮

```tsx
/**
 * title: 评分按钮
 * desc: 按钮有三种类型：合格、良好、不合格。
 */
import { Button, ConfigProvider } from 'myselfantd';
import React from 'react';
const margin = {
  marginRight: 20,
};
const App: React.FC = () => {
  return (
    <>
      <Button.Rate icon="qualified" style={margin}>
        <span>合格</span>
      </Button.Rate>
      <Button.Rate icon="good" style={margin}>
        <span>良好</span>
      </Button.Rate>
      <Button.Rate icon="unqualified" style={margin}>
        <span>不合格</span>
      </Button.Rate>
    </>
  );
};
export default App;
```

## 3.图片按钮

```tsx
/**
 * title: 图片按钮
 * desc: 按钮有六种类型：搜索、刷新、告警、添加、展开、收起、重置。
 */
import { Button } from 'myselfantd';
import React from 'react';
const margin = {
  marginRight: 20,
};
const App: React.FC = () => {
  return (
    <>
      <Button.Image type="primary" icon="search" size="large" style={margin}>
        搜索
      </Button.Image>
      <Button.Image icon="refresh" size="large" style={margin}>
        刷新
      </Button.Image>
      <Button.Image type="primary" icon="alarm" size="large" style={margin}>
        告警
      </Button.Image>
      <Button.Image type="primary" icon="add" size="large" style={margin}>
        添加
      </Button.Image>
      <Button.Image icon="arrowleft" size="large" style={margin}>
        展开
      </Button.Image>
      <Button.Image icon="arrowright" size="large" style={margin}>
        收起
      </Button.Image>
    </>
  );
};
export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
