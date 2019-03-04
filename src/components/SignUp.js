import React from 'react'
import { Form } from "semantic-ui-react"
import { connect } from 'react-redux'
import { createNewUser } from '../actions/index'
import { withRouter, Link } from 'react-router-dom'
import './App.css'

const bankOptions = [
  { value: "Bank of America", text: "Bank of America" },
  { value: "Chase", text: "Chase" },
  { value: "Wells Fargo", text: "Wells Fargo" },
  { value: "Citi Bank", text: "Citi Bank" },
  { value: "Capital One", text: "Capital One" },
  { value: "American Express", text: "American Express" },
  { value: "U.S. Bank", text: "U.S. Bank" },
  { value: "PNC", text: "PNC" },
  { value: "TD Bank", text: "TD Bank" },
  { value: "Navy Federal", text: "Navy Federal" }
]

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
    const userData = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      bank: this.state.bank,
      account_number: this.state.account_number,
      monthly_income: this.state.monthly_income
    }
    this.props.createNewUser(userData, this.props.history)
  }

  render() {
    return (
      <div className="content-container">
        <h1>Sign up</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid label='Full Name'
            name="name"
            placeholder="Full Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid label='Username'
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid label='Password'
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Form.Select
            fluid label='Bank Institution'
            options={bankOptions}
            name="bank"
            placeholder="Please choose your bank"
            onChange={this.onChange}
          />
          <Form.Input
            fluid label='Account Number'
            type="password"
            name="account_number"
            placeholder="Account Number"
            value={this.state.account_number}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid label='Monthly Income'
            type="number"
            name="monthly_income"
            value={this.state.monthly_income}
            onChange={this.handleChange}
          />
          <Form.Button type="submit">
            Signup
          </Form.Button>
        </Form>
        <br/>
        <p>Already have an account? <Link to="/login">Login!</Link></p>
        <br/>
      </div>
    )
  }
}

export default withRouter(connect(null, { createNewUser })(Signup))
