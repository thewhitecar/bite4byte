import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from './redux/reducer'
import './App.css';
import Login from './Components/login/login'
import router from './router'
import { withRouter } from 'react-router-dom';


class App extends Component {

  componentDidMount() {
    this.props.login()
  }
  
  render() {
    return (
      <div className="App">
        {router}
      </div>
    )
  }
}

export default withRouter(connect(null, {login})(App));