import React, {Component} from 'react'

class Login extends Component {
  constructor() {
    super()
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

  handleLoginSubmit = () => {

  }

  render(){
    let {username, password} =  this.state
    return (
      <div>
        <div>
          Login: 
          <form onSubmit={this.handleLoginSubmit}>
            <p>Username</p>
            <input type='submit text' autoFocus='true' onChange={this.handleUsernameInput} value={username}></input>
            <p>Password</p>
            <input type='password' onChange={this.handlePasswordInput} value={password}></input>
          </form>
        </div>
        <div>
          <button type='submit' form='form'>Submit</button>
        </div>
      </div>
    )
  }
}

export default Login