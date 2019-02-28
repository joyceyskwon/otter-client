import React from 'react'
import TransactionsList from './TransactionsList'
import TransactionForm from './TransactionForm'
import TotalBalance from './TotalBalance'
import Homepage from './Homepage'
import CategoryList from './CategoryList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AccountContainer extends React.Component {

  render() {
    if (this.props.currentUser) {return (
      <div>
        <TransactionForm />
        <hr/>
        <TotalBalance
          currentUser={this.props.currentUser}
        />
        <hr/>
        <TransactionsList
          transactions={this.props.currentUser.transactions}
        />
        <hr/>
        <CategoryList
          transactions={this.props.currentUser.transactions}
        />
      </div>
    )} else {
      return(<Homepage />)
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  newTransaction: state.transactions.item
})

export default withRouter(connect(mapStateToProps)(AccountContainer))
