// props from AccountContainer.js

import React from 'react'
import SpentLeftChart from './SpentLeftChart'
import SpentAreaChart from './SpentAreaChart'
import { Icon, Divider } from 'semantic-ui-react'

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const today = new Date()

class TotalBalance extends React.Component {

  state = {
    filteredTransactions: [],
    amountArray: [],
    spent: 0,
    left: 0,
    spentPercent: 0,
    leftPercent: 100,
    thisMonth: 0,
    lastMonth: 0,
    lastLastMonth: 0
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

  // select options - today's month
  thisMonth = () => {
    return monthNames[today.getMonth()]
  }

  // select options - last month
  lastMonth = () => {
    if (today.getMonth() === 0) {
      return monthNames[12]
    } else {
      return monthNames[today.getMonth() - 1]
    }
  }

  // select options - 2 months ago
  lastLastMonth = () => {
    if (monthNames[today.getMonth()] === "January") {
      return monthNames[10]
    } else if (monthNames[today.getMonth()] === "February") {
      return monthNames[11]
    } else {
      return monthNames[today.getMonth() - 2]
    }
  }

  // data for the area chart for monthly spending
  areaChartData = () => {
    const data = [
      { name: `${this.lastLastMonth()}`, Spent: this.state.thisMonth },
      { name: `${this.lastMonth()}`, Spent: this.state.lastMonth },
      { name: `${this.thisMonth()}`, Spent: this.state.lastLastMonth }
    ]
    return data
  }

  render() {
    return (
      <div className="content-container totalbalance">
        <h1>{this.changeMonthToString()}</h1>
        <h2>Income: ${this.props.currentUser.monthly_income}</h2>
        <Divider />
        <Icon link={true} name='area graph'/>
        <SpentLeftChart
          pieData={this.pieData()}
          spent={this.state.spent}
          left={this.state.left}
        />

        <Icon link name='pie graph'/>
        <SpentAreaChart
          data={this.areaChartData()}
        />
        <h4 id="spent">Spent: ${this.state.spent}</h4>
        <h4 id="left">Left: ${this.state.left}</h4>
      </div>
    )
  }
}

export default TotalBalance
