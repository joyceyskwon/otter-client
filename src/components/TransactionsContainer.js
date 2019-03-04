import React from 'react'
import NewTransactionForm from './NewTransactionForm'
import TransactionsList from './TransactionsList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class TransactionsContainer extends React.Component {
  render() {
    return (
      <div className="content-container">
        <NewTransactionForm
          currentUser={this.props.currentUser}
        />
        <TransactionsList
          currentUser={this.props.currentUser}
          transactions={this.props.currentUser.transactions}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, transactions }) => ({
  currentUser: auth.currentUser,
  newTransaction: transactions.item
})

export default withRouter(connect(mapStateToProps)(TransactionsContainer))
