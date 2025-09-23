import { Space } from 'antd';
import type { SpaceProps } from 'antd';
import React from 'react';

const App: React.FC<SpaceProps> = (props) => <Space {...props}>{props.children}</Space>;
export default App;
