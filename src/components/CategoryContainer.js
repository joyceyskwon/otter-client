// props from AccountContainer.js

import React from 'react'
import MonthFilter from './MonthFilter'
import CategoryFilter from './CategoryFilter'
import CategoryChart from './CategoryChart'
import CategoryAreaChart from './CategoryAreaChart'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const today = new Date()

class CategoryContainer extends React.Component {

  state = {
    activeIndex: 0,
    filteredTransactions: [],
    monthlySpent: 0,
    filteredByCategory: [],
    categorySpent: 0,
    data1: 0,
    data2: 0,
    data3: 0,
    data4: 0,
    data5: 0,
    data6: 0,
    data7: 0,
    data8: 0
  }

  // filters transactions by selected month options
  filterByMonth = e => {
    let filteredTransactions = this.props.transactions.filter(transaction => {
      return parseInt(e.target.value) === this.getMonth(transaction)
    })
    this.setState({
      filteredTransactions
    }, () => this.amountArray())
  }

  // pulls out only the amount from filtered transactions by month
  amountArray = () => {
    let amount = {}
    let total = 0
    if(this.state.filteredTransactions.length > 0) {
      this.state.filteredTransactions.forEach(trans => {
        if(amount[trans.category_id]) {
          amount[trans.category_id] += parseFloat(trans.amount)
        } else {
          amount[trans.category_id] = parseFloat(trans.amount)
        }
        this.setState()
        total += parseFloat(trans.amount)
      })
      this.setState({
        monthlySpent: total
      }, () => this.calculateCategoryPercentage())
    } else {
      this.setState({
        monthlySpent: 0
      }, () => console.log("no transactions in this month"))
    }
  }

  calculateCategoryPercentage = () => {
    let percentages = {}
    let grandtotal = this.state.monthlySpent
    this.state.filteredTransactions.forEach(trans => {
      if(percentages[trans.category_id]) {
        percentages[trans.category_id] += parseFloat(parseFloat(trans.amount)/grandtotal)
      } else {
        percentages[trans.category_id] = parseFloat(parseFloat(trans.amount)/grandtotal)
      }
    })
    this.setState({
      data1: percentages[1],
      data2: percentages[2],
      data3: percentages[3],
      data4: percentages[4],
      data5: percentages[5],
      data6: percentages[6],
      data7: percentages[7],
      data8: percentages[8]
    })
  }

  // filters transactions by category id (from monthly filtered transactions)
  filterByCategory = e => {
    if(this.state.filteredTransactions.length > 0) {
      let filteredByCategory = this.state.filteredTransactions.filter(transaction => {
        return parseInt(e.target.value) === transaction.category_id
      })
      this.setState({
        filteredByCategory
      }, () => this.amountByCategory())
    } else {
      console.log("in filterByCategory, filteredTransactions array is empty!!!")
    }
  }

  // pulls out amount from each transaction from category filtered transactions
  amountByCategory = () => {
    let amount = {}
    let total = 0
    if(this.state.filteredByCategory.length > 0) {
      this.state.filteredByCategory.forEach(trans => {
        if(amount[trans.category_id]) {
          amount[trans.category_id] += parseFloat(trans.amount)
        } else {
          amount[trans.category_id] = parseFloat(trans.amount)
        }
        total += parseFloat(trans.amount)
      })
      this.setState({
        categorySpent: total
      }, () => console.log(this.state.categorySpent))
    } else {
      this.setState({
        categorySpent: 0
      }, () => console.log("no transactions in this category"))
    }
  }

  getMonth = transaction => {
    let monthInt = parseInt(transaction.date.split("-")[1])
    return monthInt
  }


  // filtered transactions need their own component (conditional rendering)
  // from filtered transactions component, create select by category
  // filter them by category
  // calculate the percentages of each category (total amount of a category / total spending that month)

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    })
  }

  chartData = () => {
    const data = [
      { name: 'Bills & Utilities', value: this.state.data1 },
      { name: 'Dining & Drinks', value: this.state.data2 },
      { name: 'Travel', value: this.state.data3 },
      { name: 'Groceries', value: this.state.data4 },
      { name: 'Shopping', value: this.state.data5 },
      { name: 'Commuting & Auto', value: this.state.data6 },
      { name: 'Personal Care', value: this.state.data7 },
      { name: 'Others', value: this.state.data8 }
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

  areaChartData = () => {
    const data = [
      { name: `${this.lastLastMonth()}`, uv: 4000, pv: 2400, amt: 2400 },
      { name: `${this.lastMonth()}`, uv: 2000, pv: 1398, amt: 2210 },
      { name: `${this.thisMonth()}`, uv: 3000, pv: 9800, amt: 2290 }
    ]
    return data
  }

  render() {
    return (
      <div>
        <h3>Sort by Month</h3>
        <MonthFilter
          filterByMonth={this.filterByMonth}
        />
        Total spending: ${this.state.monthlySpent}

        <CategoryChart
          activeIndex={this.state.activeIndex}
          data={this.chartData()}
          onPieEnter={this.onPieEnter}
        />

        <CategoryAreaChart
          data={this.areaChartData()}
        />

        <CategoryFilter
          filterByCategory={this.filterByCategory}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
  transactions: auth.currentUser.transactions
})

export default withRouter(connect(mapStateToProps)(CategoryContainer))
