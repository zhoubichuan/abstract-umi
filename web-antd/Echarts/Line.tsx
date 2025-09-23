import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.scss';
import React from 'react';

interface Props {
  option: any;
  height?: string;
  width?: string;
}
const App: React.FC<Props> = ({ option, ...style }) => {
  var myChart;
  const chartRef = useRef<any>(null);
  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    myChart.setOption(option);
  }, [option]);
  return <div className={styles.line} ref={chartRef} style={style}></div>;
};
export default App;
