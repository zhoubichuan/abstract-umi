import { Card, Tabs, Button } from '..';
import React, { memo } from 'react';
import styles from './index.module.scss';
interface Props {
  tabBarExtraContent?: any;
  targetKey?: string;
  keyChnage?: any;
  height?: number;
  children?: React.ReactNode;
}
const App: React.FC<Props> = (props) => {
  let { children, tabBarExtraContent, targetKey = '', keyChnage, height=1 } = props;
  const handleOnChange = (key: string) => {
    keyChnage(key);
  };
  let { TabPane } = Tabs;
  return (
    <Card className={styles.tabsTemplate} height={height}>
      <Tabs defaultActiveKey="0" onChange={handleOnChange} tabBarExtraContent={tabBarExtraContent}>
        {React.Children.map(children, (item: any, index: number) => {
          let { title } = item.props;
          let key = String(index);
          return (
            <TabPane tab={title} key={key}>
              {targetKey.includes(key) && item}
            </TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default memo(App);
