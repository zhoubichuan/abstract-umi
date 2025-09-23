/* eslint-disable react/prop-types */
import { Tree } from 'antd';
import type { TreeProps } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
interface Props {
  onChange?: any;
  value?: Array<string>;
  title?: any;
}
interface Attr {
  DirectoryTree: any;
}
const App: React.FC<TreeProps & Props> & Attr = (props) => {
  let { onChange, value = [], title, treeData, ...restProps } = props;
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [expandedKeys, setExpandedKeys] = useState([] as any);
  useEffect(() => {
    setExpandedKeys(treeData?.map((item: any) => item.id));
  }, [treeData]);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    onChange?.(value);
    setData(value);
  }, [value]);
  const onSelect = (selectedKeys: any, info: any) => {
    setData(selectedKeys);
    onChange?.([...selectedKeys]);
  };

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  return (
    <div className={styles.tree}>
      {title && <p className={styles.title}>{title}</p>}
      <Tree
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        checkedKeys={data}
        // selectedKeys={data}
        expandedKeys={expandedKeys}
        checkable
        // onSelect={onSelect}
        onCheck={onSelect}
        treeData={treeData}
        {...restProps}
      />
    </div>
  );
};
App.DirectoryTree = Tree.DirectoryTree;
export default App;
