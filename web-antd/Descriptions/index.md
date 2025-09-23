---
title: Descriptions
nav:
  path: /components
---

# Descriptions

```tsx
import { Descriptions } from 'myselfantd';
import React from 'react';

const App: React.FC = () => (
  <Descriptions title="User Info">
    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
    <Descriptions.Item label="Remark">empty</Descriptions.Item>
    <Descriptions.Item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
);

export default App;
```

## Descriptions.TableInput

```tsx
import { Descriptions, Button } from 'myselfantd';
import React from 'react';

const App: React.FC = () => (
  <div style={{ width: '450px' }}>
    <Descriptions.Row
      title="请对此次作业进行评估"
      content={[
        <Button.Rate key={1} icon={'qualified'}>
          <span>合格</span>
        </Button.Rate>,
        <Button.Rate key={2} icon={'good'}>
          <span>良好</span>
        </Button.Rate>,
        <Button.Rate key={3} icon={'unqualified'}>
          <span>不合格</span>
        </Button.Rate>,
      ]}
    />
  </div>
);

export default App;
```

## Descriptions.TableInput

```tsx
import { Descriptions, Input } from 'myselfantd';
import React from 'react';

const App: React.FC = () => (
  <div style={{ width: '450px' }}>
    <Descriptions.TableInput
      table={[
        '头部一',
        '头部二',
        '头部三',
        '字段1666666666',
        `${11} xx`,
        <Input.Circle key={1} />,
        '字段2',
        `${'1666661'} xx`,
        <Input.Circle key={2} />,
        '字段3',
        `${'12'} xx`,
        <Input.Circle key={3} />,
        '字段4',
        `${'14'} xx`,
        <Input.Circle key={4} />,
      ]}
    />
  </div>
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
