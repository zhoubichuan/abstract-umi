---
title: TimePicker
nav:
  path: /components
---

# TimePicker

```tsx
import { TimePicker } from 'myselfantd';
import type { Moment } from 'moment';
import moment from 'moment';
import React from 'react';

const onChange = (time: Moment, timeString: string) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
);

export default App;
```

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
