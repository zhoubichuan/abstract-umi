import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProviderProps } from 'antd/lib/config-provider';

function HljConfigProvider(props: ConfigProviderProps) {
  return (
    <ConfigProvider
      locale={zhCN}
      autoInsertSpaceInButton={false}
      {...props}
    />
  );
}

export default HljConfigProvider;
