import { Row } from 'antd';
import type { RowProps } from 'antd';

import React from 'react';
const App: React.FC<RowProps> = (props) => <Row {...props}>{props.children}</Row>;
export default App;
