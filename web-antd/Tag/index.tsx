import { Tag, Tooltip } from 'antd';
import type { TagProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
interface Props {
  limitLength?: number;
  noborder?: number;
}
const App: React.FC<TagProps & Props> = (props) => {
  let { limitLength, noborder } = props;
  let classnames = classNames(styles.tag, {
    [styles.limitLength]: limitLength,
    [styles.noBorder]: noborder,
  });
  return (
    <div className={classnames}>
      {limitLength ? (
        <Tooltip placement="topLeft" title={props.children} style={{ fontSize: '12px' }}>
          <Tag {...props}>{props.children}</Tag>
        </Tooltip>
      ) : (
        <Tag {...props}>{props.children}</Tag>
      )}
    </div>
  );
};

export default App;
