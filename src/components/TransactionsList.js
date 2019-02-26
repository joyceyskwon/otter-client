import React from 'react'
import TransactionItem from './TransactionItem'

class TransactionsList extends React.Component {

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

export default TransactionsList
