import React from 'react'
import { Form } from "semantic-ui-react"
import { connect } from 'react-redux'
import { createTransaction, fetchTransactions } from '../actions/index'

const categoryOptions = [
  { key: 1 , value: 1, text: "Bills & Utilities" },
  { key: 2 , value: 2, text: "Dining & Drinks" },
  { key: 3 , value: 3, text: "Travel" },
  { key: 4 , value: 4, text: "Groceries" },
  { key: 5 , value: 5, text: "Shopping" },
  { key: 6 , value: 6, text: "Commuting & Auto" },
  { key: 7 , value: 7, text: "Personal Care" },
  { key: 8 , value: 8, text: "Others" }
]

class TransactionForm extends React.Component {

  state = {
    user_id: 0,
    name: '',
    date: '',
    amount: 0,
    location: ''
  }

  handleSelectChange = (e, { value }) => {
    this.setState({
      value
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const transaction = {
      user_id: this.props.currentUser.id,
      category_id: this.state.value,
      name: this.state.name,
      date: this.state.date,
      amount: this.state.amount,
      location: this.state.location
    }
    this.props.createTransaction(transaction)
    this.setState({
      user_id: 0,
      name: '',
      date: '',
      amount: 0,
      location: ''
    })
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <h4>Add Transaction</h4>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Input
              width={12}
              fluid label='Title'
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              width={6}
              fluid label='Category'
              options={categoryOptions}
              placeholder="Please choose a category"
              value={value}
              onChange={this.handleSelectChange}
            />
            <Form.Input
              width={6}
              fluid label='Date'
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group>
            <Form.Input
              width={6}
              fluid label='Amount'
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.onChange}
              />
            <Form.Input
              width={6}
              fluid label='Location'
              type="text"
              name="location"
              placeholder="Enter city name"
              value={this.state.location}
              onChange={this.onChange}
              />
          </Form.Group>
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </div>
    )
  }

}

const mapStateToProps = ({auth}) => ({
  currentUser: auth.currentUser
})

export default connect(mapStateToProps, { createTransaction, fetchTransactions })(TransactionForm)
