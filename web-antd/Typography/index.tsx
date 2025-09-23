import { Typography } from 'antd';
import type { TypographyProps } from 'antd';

import React from 'react';
const App: React.FC<any> & {
  Text: any;
  Link: any;
  Title: any;
  Paragraph: any;
} = (props) => <Typography {...props}></Typography>;
const { Text, Link, Title, Paragraph } = Typography;
App.Text = Text;
App.Link = Link;
App.Title = Title;
App.Paragraph = Paragraph;
export default App;
