import React from 'react'
import SignUp from './SignUp'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../actions/index'

class Login extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.loginUser(this.state.username, this.state.password)
    this.props.history.push('/profile')
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <br/>
          <input
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <label>Password</label>
          <br/>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <button type="submit">
            Login
          </button>
        </form>

        <p>Don't have an account yet?<Link to="/signup">Sign up!</Link></p>
      </div>
    )
  }
}

export default withRouter(connect(null, { loginUser })(Login))
