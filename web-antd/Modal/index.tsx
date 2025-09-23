/* eslint-disable react/prop-types */
import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import Dialog from './Dialog';
const App: React.FC<ModalProps> & {
  Dialog: any;
  confirm: any;
  destroyAll: any;
} = (props) => {
  return <Modal {...props}>{props.children}</Modal>;
};
App.Dialog = Dialog;
App.confirm = Modal.confirm;
App.destroyAll = Modal.destroyAll;
export default App;
