import { Comment } from 'antd';
import type { CommentProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
const App: React.FC<CommentProps> = (props) => {
  return <div className={styles.comment}><Comment {...props}>{props.children}</Comment></div>;
};

export default App;
