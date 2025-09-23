/* eslint-disable react/prop-types */
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<CollapseProps> & { Panel: any } = (props) => {
  return <div className={styles.collapse}><Collapse {...props}>{props.children}</Collapse>;</div>
};
App.Panel = Collapse.Panel;
export default App;
