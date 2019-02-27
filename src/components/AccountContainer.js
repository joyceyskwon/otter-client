import React from 'react'
import TransactionsList from './TransactionsList'
import TransactionForm from './TransactionForm'
import CategoryList from './CategoryList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AccountContainer extends React.Component {

  render() {
    console.log('rendering AccountContainer')
    console.log(this.props)
    if (this.props.currentUser) {return (
      <div>
        <TransactionForm />
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
      return(<h1>Not logged in</h1>)
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  newTransaction: state.transactions.item
})

export default withRouter(connect(mapStateToProps)(AccountContainer))
