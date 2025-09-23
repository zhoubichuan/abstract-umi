import { Segmented } from 'antd';
import type { SegmentedProps } from 'antd';
import styles from './index.module.scss';
import React, { useState } from 'react';
const App: React.FC<any> = (props) => {
  let { item, onChange } = props;
  const [type, setType] = useState(item[0].value);
  const handleChange = (val: any) => {
    setType(val);
    onChange(val);
  };
  return (
    <div className={styles.segmented}>
      <div style={{ width: '300px', margin: '0 auto', paddingBottom: '30px' }}>
        <Segmented block options={item} onChange={handleChange} value={type} />
      </div>
      {item.map((child: any, i: number) => {
        return (
          child.value === type &&
          React.cloneElement(child.content, {
            key: item.value,
          })
        );
      })}
    </div>
  );
};
export default App;
