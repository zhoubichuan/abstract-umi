---
title: Mentions
nav:
  path: /components
---

# Mentions

```tsx
import { Mentions } from 'myselfantd';
import type { OptionProps } from 'antd/es/mentions';
import React from 'react';

const { Option } = Mentions;

const onChange = (value: string) => {
  console.log('Change:', value);
};

const onSelect = (option: OptionProps) => {
  console.log('select', option);
};

const App: React.FC = () => (
  <Mentions
    style={{ width: '100%' }}
    onChange={onChange}
    onSelect={onSelect}
    defaultValue="@afc163"
  >
    <Option value="afc163">afc163</Option>
    <Option value="zombieJ">zombieJ</Option>
    <Option value="yesmeck">yesmeck</Option>
  </Mentions>
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
