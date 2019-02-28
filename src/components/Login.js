import React from 'react'
import { Form, Button } from "semantic-ui-react"
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
    this.props.loginUser(this.state.username, this.state.password, this.props.history)
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Username</label>
            <input
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              />
          </Form.Field>
          <Button type="submit">
            Login
          </Button>
        </Form>
        <br/>
        <p>Don't have an account yet? <Link to="/signup">Sign up!</Link></p>
        <br/>
      </div>
    )
  }
}

export default withRouter(connect(null, { loginUser })(Login))
