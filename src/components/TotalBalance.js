// props from AccountContainer.js

import React from 'react'
import SpentLeftChart from './SpentLeftChart'
import { Icon } from 'semantic-ui-react'

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

  filterThisMonthSpending = () => {
    let month = this.getThisMonth()
    let filteredTransactions = this.props.currentUser.transactions.filter(transaction => {
      return month === this.getMonth(transaction)
    })
    this.setState({
      filteredTransactions
    }, () => this.amountArray())
  }

  amountArray = () => {
    this.setState({
      amountArray: this.state.filteredTransactions.map(transaction=>parseInt(transaction.amount))
    }, () => this.totalSpent())
  }

  totalSpent = () => {
    this.setState({
      spent: this.state.amountArray.reduce(this.getSum)
    }, () => this.totalLeft())
  }

  totalLeft = () => {
    this.setState({
      left: this.props.currentUser.monthly_income - this.state.spent
    }, () => this.spentPercent())
  }

  spentPercent = () => {
    let spentPercent = Math.floor((this.state.spent/this.props.currentUser.monthly_income)*100)
    this.setState({
      spentPercent
    }, () => this.leftPercent())
  }

  leftPercent = () => {
    if(this.state.spentPercent === 0) {
      return this.state.leftPercent
    } else {
      this.setState({
        leftPercent: 100 - this.state.spentPercent
      })
    }
  }

  getMonth = transaction => {
    let monthInt = parseInt(transaction.date.split("-")[1])
    return monthInt
  }

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

  getSum = (total, num) => {
    return total + num
  }

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
        <p>Income: ${this.props.currentUser.monthly_income}</p>
        <Icon link name='area graph'/>
        <Icon link name='pie graph'/>
        <SpentLeftChart
          pieData={this.pieData()}
        />

        <p>Spent: ${this.state.spent}</p>
        <p>Left: ${this.state.left}</p>
      </div>
    )
  }
}

export default TotalBalance
