import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';
interface ChartsProps {
  id: any;
  option: any;
  actionRef?: any;
  style?: React.CSSProperties;
}

const App: React.FC<ChartsProps> = (props) => {
  const { option, actionRef: propsActionRef, ...restProps } = props;
  const chartRef = useRef<any>(null);
  let className = classnames(styles.pie);
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

  return <div className={className} ref={chartRef} {...restProps}></div>;
};

export default App;
