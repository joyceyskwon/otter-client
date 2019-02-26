import React from 'react'
import TransactionItem from './TransactionItem'
import { connect } from 'react-redux'
import { fetchTransactions } from '../actions/index'

class TransactionsList extends React.Component {

  componentDidMount() {
    this.props.fetchTransactions()
  }

  transactionItems = () => this.props.transactions.map(transaction => {
    return <div key={transaction.id}>
      <h4>{transaction.name}</h4>
      <p>Date: {transaction.date}</p>
      <p>Amount: {transaction.amount}</p>
    </div>
  })

  render() {
    return (
      <div>
        <h2>All Transactions</h2>
          <table>
            <tbody>
              <tr>
                <th>
                  <h3>Name</h3>
                </th>
                <th>
                  <h3>Date</h3>
                </th>
                <th>
                  <h3>Amount</h3>
                </th>
              </tr>

              {this.props.transactions.map(transaction => {
                return <TransactionItem
                  key={transaction.id}
                  {...transaction}
                />
              })}

            </tbody>
          </table>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  transactions: state.transactions.items,
  newTransaction: state.transactions.item
})

export default connect(mapStateToProps, { fetchTransactions })(TransactionsList)
