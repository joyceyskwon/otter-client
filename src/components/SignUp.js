import React from 'react'
import { connect } from 'react-redux'
import { createNewUser } from '../actions/index'
import { withRouter } from 'react-router-dom'
import './App.css'

class Signup extends React.Component {

  state = {
    name: '',
    username: '',
    password: '',
    bank: '',
    account_number: 0,
    monthly_income: 0
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createNewUser()
    this.props.history.push('/profile')
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <br/>
          <input
            name="name"
            placeholder="Full Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br/>
          <br/>
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
          <label>Bank Institution</label>
          <br/>
          <select
            name="bank"
            onChange={this.handleChange}
          >
            <option>Please choose your bank</option>
            <option value="Bank of America">Bank of America</option>
            <option value="Chase">Chase</option>
            <option value="Wells Fargo">Wells Fargo</option>
            <option value="Citi Bank">Citi Bank</option>
            <option value="Capital One">Capital One</option>
            <option value="American Express">American Express</option>
            <option value="U.S. Bank">U.S. Bank</option>
            <option value="PNC">PNC</option>
            <option value="TD Bank">TD Bank</option>
            <option value="Navy Federal">Navy Federal</option>
          </select>
          <br/>
          <br/>
          <label>Account Number</label>
          <br/>
          <input
            type="password"
            name="account_number"
            placeholder="Account Number"
            value={this.state.account_number}
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <label>Monthly Income</label>
          <br/>
          $<input
            type="number"
            name="monthly_income"
            placeholder="0.00"
            value={this.state.monthly_income}
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <button type="submit">
            Signup
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, { createNewUser })(Signup))
