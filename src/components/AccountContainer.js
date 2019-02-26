import React from 'react'
import TransactionsList from './TransactionsList'
import TransactionForm from './TransactionForm'
import CategoryList from './CategoryList'
import { connect } from 'react-redux'
import { fetchTransactions } from '../actions/index'

class AccountContainer extends React.Component {

  componentDidMount() {
    this.props.fetchTransactions()
  }

  getMonth = transaction => {
    let month = transaction.date.split("-")[1]
    if (month.toString().charAt(0) === 0) {
      return month.toString().charAt(1)
    } else {
      return month
    }
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
        <TransactionForm />
        <hr/>
        <TransactionsList
          transactions={this.props.transactions}
        />
        <hr/>
        <CategoryList
          transactions={this.props.transactions}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions.items,
  newTransaction: state.transactions.item
})

export default connect(mapStateToProps, { fetchTransactions })(AccountContainer)
