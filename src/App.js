import React from 'react';
import MyComponent from './comp/MyComp'
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
      <MyComponent/>
      </div>
    );
  }
}

export default App;
