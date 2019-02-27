import React from 'react'
import MonthFilter from './MonthFilter'
import CategoryItem from './CategoryItem'
import { connect } from 'react-redux'

class CategoryList extends React.Component {

  state = {
    filteredTransactions: [],
    amountArray: [],
    totalSpending: 0
  }

  filterByMonth = e => {
    let filteredTransactions = this.props.transactions.filter(transaction => e.target.value === parseInt(transaction.date.split("-")[1]))
    this.setState({
      filteredTransactions
    })
  }

  filterAmount = () => {
    let amountArray = this.state.filteredTransactions.map(transaction => parseInt(transaction.amount))
    console.log(amountArray)
    // this.setState({
    //   amountArray
    // },()=>console.log(this.state.amountArray))
  }

  calculateTotalSpending = () => {
    let totalSpending = 0.00
    for(var i = 0, len = this.state.amountArray.length; i < len; i++) {
      totalSpending += this.state.amountArray[i]
    }
    return totalSpending
  }

  render() {
    return (
      <div>
        <h3>Sort by Category</h3>
        <MonthFilter
          filterByMonth={this.filterByMonth}
        />
        <hr/>
        Total spending: ${this.calculateTotalSpending()}
        <hr/>
        <select
          name="name"
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
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  transactions: state.auth.currentUser.transactions
})

export default connect(mapStateToProps)(CategoryList)
