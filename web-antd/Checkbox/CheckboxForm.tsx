import { Row, Col, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
interface FieldNames {
  name: string;
  value: string;
}
interface Props {
  title?: string;
  request?: Function;
  fieldNames?: FieldNames;
  reload?: any;
  disabled?: boolean;
}
const App: React.FC<Props> = (props) => {
  let { title, request, fieldNames, reload, ...restProps } = props;
  let [data, setData] = useState([]);
  const initData = async () => {
    if (request) {
      let result = await request();
      setData(result);
    }
  };
  useEffect(() => {
    initData();
  }, [reload]);

  return (
    <div>
      {title && <p className={styles.title}>{title}</p>}
      <Checkbox.Group {...restProps}>
        <Row>
          {data.map((item: any, index: number) => (
            <Col span={8} key={index}>
              <Checkbox value={item.code} style={{ lineHeight: '32px' }}>
                {item.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
};
export default App;
