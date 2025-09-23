import { List } from 'antd';

import React from 'react';
const App: React.FC<any> = (props) => <List.Item.Meta {...props}>{props.children}</List.Item.Meta>;
export default App;
