import React from 'react'
import TransactionsList from './TransactionsList'
import TransactionForm from './TransactionForm'
import MonthFilter from './MonthFilter'

class Transactions extends React.Component {

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
        <TransactionsList />
        <hr/>
        <MonthFilter
          transactions={this.props.transactions}
          filterByMonth={this.filterByMonth}
        />
        <TransactionsList />
      </div>
    )
  }
}

export default Transactions
