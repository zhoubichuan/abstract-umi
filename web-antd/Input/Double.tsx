import { Input } from '..';
import type { InputProps } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const App: React.FC<any> = (props) => {
  let { onChange, value } = props;
  let [data, setData] = useState({ pre: '', next: '' });

  const preOnChange = (e: any) => {
    setData({ ...data, pre: e.target.value });
    onChange?.(data);
  };
  const nextOnChange = (e: any) => {
    setData({ ...data, next: e.target.value });
    onChange?.(data);
  };
  useEffect(() => {
    setData(value);
    console.log(value,'double----')
  }, [value]);
  return (
    <Input.Group style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Input placeholder="请输入" value={data?.pre} onChange={preOnChange} />
      <span style={{ textAlign: 'center', margin: '6px 10px' }}>-</span>
      <Input placeholder="请输入" value={data?.next} onChange={nextOnChange} />
    </Input.Group>
  );
};

export default App;
