---
title: Echarts
nav:
  path: /components
---

# Echarts

## 1.Echarts.Pie

```tsx
import React, { useRef, useState, useEffect } from 'react'
import { Echarts } from 'myselfantd'
const App: React.FC = () => {
  const chartRef = useRef<ECharts>(null)
  const [chartOption, setChartOption] = useState<any>(null)
  useEffect(() => {
    let option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    }
    setChartOption(option)
  }, [])
  return (
    <Echarts.Pie
      option={chartOption}
      actionRef={chartRef}
      style={{ height: '400px' }}
    />
  )
}
export default App
```

<!-- ```tsx
import { Echarts } from 'myselfantd';
import { useState, useEffect } from 'react';

const App = () => {
  let [getOptions, setPieChartOptions1] = useState({});
  function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)]
    };
  }
  let data: any = [];
  let now = new Date(1997, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  for (var i = 0; i < 1000; i++) {
    data.push(randomData());
  }
  let option: any = {
    title: {
      text: 'XXX要素报警详情'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        params = params[0];
        var date = new Date(params.name);
        return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear() +
          ' : ' +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '(cm)',
      min: 10,
      // min 是最小的值
      max: 1800
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: data,
        markLine: {
          //添加警戒线
          symbol: 'none', //去掉警戒线最后面的箭头
          name: '警戒线',
          silent: true,
          label: {
            position: 'end', //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
            formatter: '警戒线(' + 900 + ')',
            color: 'red',
            fontSize: 14
          },
          data: [
            {
              silent: true, //鼠标悬停事件  true没有，false有
              lineStyle: {
                //警戒线的样式  ，虚实  颜色
                type: 'solid',
                color: 'red'
              },
              name: '警戒线',
              yAxis: 900
            }
          ]
        }
      }
    ]
  };
  useEffect(() => {
    const timer = setInterval(function () {
      for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }
      setPieChartOptions1(option);
    }, 1000);
    return () => clearTimeout(timer);
  }, [getOptions]);
  return <Echarts.Line option={getOptions} />;
};
export default App;
``` -->

### API

| Name                  | Description            | Type    | Default |
| --------------------- | ---------------------- | ------- | ------- |
| asyncClickAutoLoading | 异步的方法自动 loading | boolean | false   |

其他 API 见`antd`文档：https://ant.design/components/button-cn/
