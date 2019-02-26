import React from 'react'

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
    console.log("in Login Submit!")
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
          <button type="submit" className="ui basic green button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
