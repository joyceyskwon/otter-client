import React from 'react'
import TransactionItem from './TransactionItem'
import { Table } from 'semantic-ui-react'


class TransactionsList extends React.Component {

  render() {

    let sortedTransactions = this.props.transactions.sort(function (a,b){ return new Date(b.date) - new Date(a.date)})

    return (
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
    )
  }

}

export default TransactionsList
