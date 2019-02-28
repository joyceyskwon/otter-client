import React from 'react'
import { Table } from 'semantic-ui-react'

const TransactionItem = props => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell>{props.name}</Table.Cell>
        <Table.Cell>{props.date}</Table.Cell>
        <Table.Cell>{props.amount}</Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}

export default TransactionItem
