import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { ToastContainer, ToastStore } from 'react-toasts';
import { login } from '../../redux/reducer';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  
  handleUsernameInput = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    let { username, password } = this.state;
    let loginInfo = { username, password };
    console.log(username, password)
    axios.post('/api/login', loginInfo).then(result => {
      this.props.login(result.data)
      console.log(result.data)
      this.props.history.push('/home')
      this.setState({
          username: "",
          password: ""
      })
    }).catch(error => {
        console.log('Error from Login.js => handleLoginSubmit', error);
        ToastStore.error("ID / Password incorrect.", 4000, 'toast-error')
    })
}

  render(){
    return (
      <div>
        <div>
          Login: 
          <form onSubmit={this.handleLoginSubmit}>
            <p>Username</p>
            <input type='submit text' autoFocus='true' onChange={this.handleUsernameInput} value={this.state.username}></input>
            <p>Password</p>
            <input type='password' onChange={this.handlePasswordInput} value={this.state.password}></input>
            <br />
          <button>Submit</button>
          </form>
        </div>
        <div>
        </div>
        <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps, { login })(Login);