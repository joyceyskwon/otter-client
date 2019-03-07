// props from TransactionsContainer.js

import React from 'react'
import TransactionItem from './TransactionItem'
import { Table, Dropdown } from 'semantic-ui-react'


class TransactionsList extends React.Component {
  //
  // state = {
  //   filteredTransactions: this.props.transactions
  // }

  state = {
    value: ""
  }

  filterLowtoHigh = () => {
return  this.props.transactions.sort(function (first, second) { return parseFloat(first.amount) - parseFloat(second.amount)})
  }

  filterHightoLow = () => {
return  this.props.transactions.sort(function (first, second) { return parseFloat(second.amount) - parseFloat(first.amount)})
  }

  filterByMostRecent = () => {

       return this.props.transactions.sort(function (first, second) { return new Date(second.date) - new Date(first.date)})

  }

  handleFilter = (e, { value }) => {
    this.setState({
      value
    })
  }

  applyFilter = () => {
    if(this.state.value === "recent") {
      return this.filterByMostRecent()
    } else if(this.state.value === "high") {
      return this.filterHightoLow()
    } else if(this.state.value === "low"){
      return this.filterLowtoHigh()
    } else {
      return this.props.transactions
    }
  }

  renderOptions = () => {
    const filterOptions = [
      { key: 1, text: "Most Recent", value: "recent"},
      { key: 2, text: "High to Low", value: "high"},
      { key: 3, text: "Low to High", value: "low"}
    ]
    return filterOptions
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <Dropdown
          onChange={this.handleFilter}
          options={this.renderOptions()}
          placeholder='Choose an option'
          selection
          value={value}
        />
        <h2>All Transactions</h2>
        <Table celled>
          <Table.Header className={"table-header"}>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

            {
              this.props.transactions.length > 0 ?
              this.applyFilter().map(transaction => {
              return <TransactionItem
                key={transaction.id}
                {...transaction}
                />
              })
              :
              console.log("no filteredTransactions")
            }

        </Table>
      </div>
    )
  }

}

export default TransactionsList
