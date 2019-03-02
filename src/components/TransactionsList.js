import React from 'react'
import TransactionItem from './TransactionItem'
import { Table } from 'semantic-ui-react'


class TransactionsList extends React.Component {

  render() {
    let sortedTransactions = this.props.transactions.sort(function (first, second) { return new Date(second.date) - new Date(first.date)})

    return (
      <div>
        <h2>All Transactions</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

            {sortedTransactions.map(transaction => {
              return <TransactionItem
                key={transaction.id}
                {...transaction}
                />
            })}

        </Table>
      </div>
    )
  }

}

export default TransactionsList
