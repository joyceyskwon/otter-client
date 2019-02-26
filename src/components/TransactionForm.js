import React from 'react'
import { connect } from 'react-redux'
import { createTransaction } from '../actions/index'

class TransactionForm extends React.Component {

  state = {
    user_id: 1,
    category_id: 0,
    name: '',
    date: '',
    amount: 0.00,
    location: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const transaction = {
      user_id: this.state.user_id,
      category_id: this.state.category_id,
      name: this.state.name,
      date: this.state.date,
      amount: this.state.amount,
      location: this.state.location
    }
    this.props.createTransaction(transaction)
  }

  render() {
    return (
      <div>
        <h4>Add Transaction</h4>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label><br/>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <br/>
          <div>
            <label>Category: </label><br/>
            <select
              name="category_id"
              onChange={this.onChange}
            >
              <option value="1">Bills & Utilities</option>
              <option value="2">Dining & Drinks</option>
              <option value="3">Travel</option>
              <option value="4">Groceries</option>
              <option value="5">Shopping</option>
              <option value="6">Commuting & Auto</option>
              <option value="7">Personal Care</option>
              <option value="8">Others</option>
            </select>
          </div>
          <br/>
          <div>
            <label>Date: </label><br/>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.onChange}
            />
          </div>
          <br/>
          <div>
            <label>Amount: </label><br/>
            $<input
              type="number"
              name="amount"
              min="0.01"
              step="0.01"
              max="100000.00"
              value={this.state.amount}
              onChange={this.onChange}
            />
          </div>
          <br/>
          <div>
            <label>Location: </label><br/>
            <input
              type="text"
              name="location"
              placeholder="Type city name"
              value={this.state.location}
              onChange={this.onChange}
            />
          </div>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default connect(null, { createTransaction })(TransactionForm)
