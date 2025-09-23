import { Card } from 'antd';

import React from 'react';
const App: React.FC<any> = (props) => <Card.Meta {...props}>{props.children}</Card.Meta>;
export default App;
