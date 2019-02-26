import React from 'react'

const TransactionItem = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.date}</td>
      <td>{props.amount}</td>
    </tr>
  )
}

export default TransactionItem
