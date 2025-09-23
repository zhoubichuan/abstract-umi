import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import React from 'react';

interface ChartsProps {
  id: any;
  option: any;
  actionRef?: any;
}

const App: React.FC<ChartsProps> = (props) => {
  const { option, actionRef: propsActionRef } = props;
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: echarts.ECharts;
    if (chartRef.current && option) {
      chart = echarts.init(chartRef.current);
      chart.setOption(option);
      if (propsActionRef) {
        propsActionRef.current = chart;
      }
    }
    // const resizeObserver = new ResizeObserver(
    //   _.debounce(() => {
    //     chart && chart.resize()
    //   }, 150)
    // )
    // resizeObserver.observe(document.getElementById(id) as Element)
    // return () => {
    //   return resizeObserver.disconnect()
    // }
  }, [option]);

  return <div style={{ height: '100%', width: '100%' }} ref={chartRef}></div>;
};

export default App;
