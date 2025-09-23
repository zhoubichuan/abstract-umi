import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import styles from './index.module.scss';
import Default from './Default';
import Image from './Image';
import Rate from './Rate';
import React from 'react';

const App: React.FC<ButtonProps> & {
  Default: any;
  Image: any;
  Rate: any;
} = (props: ButtonProps) => {
  return (
    <span className={styles.button}>
      <Button {...props}>{props.children}</Button>
    </span>
  );
};
App.Default = Default;
App.Image = Image;
App.Rate = Rate;
export default App;
