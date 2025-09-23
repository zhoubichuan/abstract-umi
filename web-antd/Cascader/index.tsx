import { Cascader } from 'antd';
import type { CascaderProps } from 'antd';
import React, { useState, useEffect } from 'react';
import './index.module.scss';
interface Props {
  request?: (...parmas: any) => void;
  loadData?: (...parmas: any) => void;
}
const App: React.FC<CascaderProps<any> & Props> = (props) => {
  let { request, loadData, ...restProps } = props;
  let [data, setData] = useState<any>([]);
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    if (request) {
      let result = await request();
      setData(result);
    }
  };
  return (
    <Cascader
      allowClear
      options={data}
      loadData={async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        if (loadData) {
          let result: any = await loadData(selectedOptions);
          targetOption.loading = false;
          targetOption.children = result;
          setData([...data]);
        }
      }}
      {...restProps}>
      {props.children}
    </Cascader>
  );
};
App.displayName = 'Cascader';
export default App;
