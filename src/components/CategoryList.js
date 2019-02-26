import React from 'react'
import MonthFilter from './MonthFilter'
import CategoryItem from './CategoryItem'
// import TransactionsList from './TransactionsList'
import { connect } from 'react-redux'
import { fetchTransactions, filterByMonth } from '../actions/index'

class CategoryList extends React.Component {

  componentDidMount() {
    this.props.fetchTransactions()
  }

  filterByMonth = e => {
    let filteredTransaction = this.props.transactions.filter(transaction => {
      return e.target.value === this.getMonth(transaction)
    })
    return filteredTransaction
  }

  render() {
    return (
      <div>
        <h3>Sort by Category</h3>
        <MonthFilter
          filterByMonth={this.filterByMonth}
        />

        <CategoryItem />

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
  categories: state.categories.items
})

export default connect(mapStateToProps, { fetchTransactions, filterByMonth })(CategoryList)
