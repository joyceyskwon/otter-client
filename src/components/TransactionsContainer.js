import React from 'react'
import NewTransactionForm from './NewTransactionForm'
import Homepage from './Homepage'
import TransactionsList from './TransactionsList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class TransactionsContainer extends React.Component {
  render() {
    if(this.props.currentUser) {
      return (
        <div className="transactions-container">
          <NewTransactionForm
            currentUser={this.props.currentUser}
          />
          <TransactionsList
            currentUser={this.props.currentUser}
            transactions={this.props.currentUser.transactions}
          />
        </div>
      )
    } else {
      return (
        <Homepage />
      )
    }
  }
}

const mapStateToProps = ({ auth, transactions }) => ({
  currentUser: auth.currentUser,
  newTransaction: transactions.items.last
  // transactions: transactions.items
})

export default withRouter(connect(mapStateToProps)(TransactionsContainer))
