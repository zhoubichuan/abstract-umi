---
title: Space
nav:
  path: /components
---

# Space

```tsx
import { Card, Space } from 'myselfantd'
import React from 'react'

const App: React.FC = () => (
  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
)

export default App
```

## 水平按钮

```tsx
import { Button, Space, message } from 'myselfantd'
import React from 'react'

const App: React.FC = () => (
  <Space size="middle">
    <Button type="link" block onClick={() => {}}>
      编辑
    </Button>
    <Button
      type="link"
      block
      onClick={() => {
        message.info('删除动态属性成功')
      }}
    >
      删除
    </Button>
  </Space>
)

export default App
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
