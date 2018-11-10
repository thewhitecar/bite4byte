import React, { Component } from 'react';
import './App.css';
import Login from './Components/login/login'
import router from './router'
import AuthCheck from './Components/AuthCheck'


class App extends Component {


  render() {
    return (
      <div className="App">
      <AuthCheck>
        {router}
      </AuthCheck>
      </div>
    )
  }
}

export default App;