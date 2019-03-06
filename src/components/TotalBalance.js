// props from AccountContainer.js

import React from 'react'
import SpentLeftChart from './SpentLeftChart'
import { Icon, Divider } from 'semantic-ui-react'

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

class TotalBalance extends React.Component {

  state = {
    filteredTransactions: [],
    amountArray: [],
    spent: 0,
    left: 0,
    spentPercent: 0,
    leftPercent: 100
  }

  componentDidMount() {
    this.filterThisMonthSpending()
  }

  // filter transactions created in today's month
  filterThisMonthSpending = () => {
    let month = this.getThisMonth()
    let filteredTransactions = this.props.currentUser.transactions.filter(transaction => {
      return month === this.getMonth(transaction)
    })
    this.setState({
      filteredTransactions
    }, () => this.amountArray())
  }

  // add up total amount spent this month
  amountArray = () => {
    let spent = 0
    if(this.state.filteredTransactions.length > 0) {
      this.state.filteredTransactions.forEach(trans => {
        spent += Math.round(parseFloat(trans.amount)*100/100)
      })
      this.setState({ spent }, () => this.totalLeft())
    } else {
      this.setState({
        spent: 0,
        left: 0,
        spentPercent: 0,
        leftPercent: 100
      })
    }
  }

  // subtracts total spent from monthly income
  totalLeft = () => {
    this.setState({
      left: this.props.currentUser.monthly_income - this.state.spent
    }, () => this.spentPercent())
  }

  // calculates percentage of total spent
  spentPercent = () => {
    let spentPercent = Math.floor((this.state.spent/this.props.currentUser.monthly_income)*100)
    this.setState({
      spentPercent
    }, () => this.leftPercent())
  }

  // calculates percentage of total money left
  leftPercent = () => {
    if(this.state.spentPercent === 0) {
      return this.state.leftPercent
    } else {
      this.setState({
        leftPercent: 100 - this.state.spentPercent
      })
    }
  }

  // pulls out month from a single transaction
  getMonth = transaction => {
    let monthInt = parseInt(transaction.date.split("-")[1])
    return monthInt
  }

  // get today's month
  getThisMonth = () => {
    const today = new Date()
    const thisMonth = today.getMonth() + 1
    return thisMonth
  }

  changeMonthToString = () => {
    let month = this.getThisMonth()
    let monthString = monthNames[month - 1]
    return monthString
  }

  // data for the pie chart
  pieData = () => {
    const data = [
        { name: 'Left', value: this.state.spentPercent },
        { name: 'Spent', value: this.state.leftPercent }
      ]
    return data
  }

  render() {
    return (
      <div className="content-container totalbalance">
        <h1>{this.changeMonthToString()}</h1>
        <h2>Income: ${this.props.currentUser.monthly_income}</h2>
        <Divider />
        <Icon link name='area graph'/>
        <Icon link name='pie graph'/>
        <SpentLeftChart
          pieData={this.pieData()}
        />

      <h4 className={"left-text"}>Spent: ${this.state.spent}</h4>
      <h4 className={"right-text"}>Left: ${this.state.left}</h4>
      </div>
    )
  }
}

export default TotalBalance
