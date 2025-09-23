import React from 'react';
const App: React.FC<any> = (props) => {
  console.log(props.value,'dddddasdfadsf')
  return props.value || '';
};
export default App;
