---
title: Input
nav:
  path: /components
---

## Input

```tsx
import { Input } from 'myselfantd'
import React from 'react'

const App: React.FC = () => <Input placeholder="Basic usage" />

export default App
```

## Circle

```tsx
import { Input } from 'myselfantd'
import React from 'react'

const App: React.FC = () => <Input.Circle placeholder="Basic usage" />

export default App
```

## Input.Group

```tsx
import { Input, Form } from 'myselfantd'
import React from 'react'

const App: React.FC = () => (
  <div style={{ width: '300px' }}>
    <Input.Group
      compact
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}
    >
      <Form.Item name="min" rules={[{ required: true, message: '最小值必填' }]}>
        <Input placeholder="最小值" />
      </Form.Item>
      <span style={{ textAlign: 'center', margin: '6px 10px' }}>-</span>
      <Form.Item name="max" rules={[{ required: true, message: '最大值必填' }]}>
        <Input placeholder="最大值" />
      </Form.Item>
    </Input.Group>
  </div>
)

export default App
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
