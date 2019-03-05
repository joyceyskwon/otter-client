// props from AccountContainer.js

import React from 'react'
import CategoryChart from './CategoryChart'
import { Dropdown } from 'semantic-ui-react'
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
  filterByMonth = (e, { value }) => {
    this.setState({
      value
    }, () => {
      let filteredTransactions = this.props.transactions.filter(transaction => {
        return parseInt(this.state.value) === this.getMonth(transaction)
      })
      this.setState({
        filteredTransactions
      }, () => this.amountArray())
    })
  }

  // saves category id as a key and total monthly spending as a value into an empty object
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

  // calculates percentages of each category's spending for a selected month
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

  // helper function for filterByMonth - pulls out the month of the transaction
  getMonth = transaction => {
    let monthInt = parseInt(transaction.date.split("-")[1])
    return monthInt
  }

  // event handler for category chart
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    })
  }

  // changes category chart data depending on the state
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

  // month filter options
  renderOptions = () => {
    const options = [
      { key: 1, text: this.thisMonth(), value: today.getMonth() + 1 },
      { key: 2, text: this.lastMonth(), value: today.getMonth() },
      { key: 3, text: this.lastLastMonth(), value: this.lastLastMonthValue() },
    ]
    return options
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

  // select options value  - 2 months ago
  lastLastMonthValue = () => {
    if (today.getMonth() === 0) {
      return 11
    } else if (today.getMonth() === 1) {
      return 12
    } else {
      return today.getMonth() - 1
    }
  }

  render() {
    const { value } = this.state
    return (
      <div className="content-container categorycontainer">
        <h1>Sort by Month</h1>
        <Dropdown
          onChange={this.filterByMonth}
          options={this.renderOptions()}
          placeholder='Choose an option'
          selection
          value={value}
        />
        Total spending: ${this.state.monthlySpent}

        <CategoryChart
          activeIndex={this.state.activeIndex}
          data={this.chartData()}
          onPieEnter={this.onPieEnter}
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
