import React, { Component } from 'react';
import './App.css';
import Login from './Components/login/login'
import router from './router'


export default class App extends Component {
  
  render() {
    return (
      <div className="App">
        {/* <Login/> */}
        {router}
      </div>
    )
  }
}