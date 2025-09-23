import { Col } from 'antd';
import type { ColProps } from 'antd';

import React from 'react';
const App: React.FC<ColProps> = (props) => <Col {...props}>{props.children}</Col>;
export default App;
