---
title: Tag
nav:
  path: /components
---

# Tag

```tsx
import { Tag } from 'myselfantd'
import React from 'react'

const log = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e)
}

const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault()
  console.log('Clicked! But prevent default.')
}

const App: React.FC = () => (
  <>
    <Tag noborder>无外边框</Tag>
    <Tag limitLength>文字长度限制：xxxxxxxxxxxxxxxxxxxxxxxxxxx yyyyyyyyyyyyyyyyyyyyyy</Tag>
    <Tag>
      <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
    </Tag>
    <Tag closable onClose={log}>
      Tag 2
    </Tag>
    <Tag closable onClose={preventDefault}>
      Prevent Default
    </Tag>
  </>
)

export default App
```

### API

| 属性/方法名称 | 描述     | 类型    | 默认值 |
| ------------- | -------- | ------- | ------ |
| noborder      | 无外边框 | boolean | false  |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
