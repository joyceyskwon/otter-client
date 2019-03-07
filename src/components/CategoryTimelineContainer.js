// props from AccountContainer.js

import React from 'react'
import CategoryAreaChart from './CategoryAreaChart'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const today = new Date()

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

class CategoryTimelineContainer extends React.Component {

  state = {
    filteredTransactions: [],
    filteredByCategory: [],
    categorySpent: 0,
    filteredLastMonth: [],
    filteredByLastMonthCategory: [],
    lastMonth: 0,
    filteredLastLastMonth: [],
    filteredByLastLastMonthCategory: [],
    lastLastMonth: 0
  }

  // helper method for filterByCategory - gets month for each transaction
  getMonth = transaction => {
    let monthInt = parseInt(transaction.date.split("-")[1])
    return monthInt
  }

  // filters transactions by selected month options
  // filters transactions by category id (from monthly filtered transactions)
  filterByCategory = (e, { value }) => {
    let filteredTransactions = this.props.transactions.filter(trans => {
      return today.getMonth() + 1 === this.getMonth(trans)
    })
    this.setState({ filteredTransactions })

    let filteredLastMonth = this.props.transactions.filter(trans => {
      return today.getMonth() === this.getMonth(trans)
    })
    this.setState({ filteredLastMonth })

    let filteredLastLastMonth = this.props.transactions.filter(trans => {
      return today.getMonth() - 1 === this.getMonth(trans)
    })
    this.setState({ filteredLastLastMonth })

    this.setState({ value }, () => {
      if(this.state.filteredTransactions.length > 0) {
        let filteredByCategory = this.state.filteredTransactions.filter(trans => {
          return this.state.value === trans.category_id
        })
        this.setState({ filteredByCategory }, () => this.amountByCategory())
      } else if(this.state.filteredLastMonth.length > 0) {
        let filteredByLastMonthCategory = this.state.filteredLastMonth.filter(trans => {
          return this.state.value === trans.category_id
        })
        this.setState({ filteredByLastMonthCategory }, () => this.amountByLastMonthCategory())
      } else if(this.state.filteredLastLastMonth.length > 0) {
        let filteredByLastLastMonthCategory = this.state.filteredLastLastMonth.filter(trans => {
          return this.state.value === trans.category_id
        })
        this.setState({ filteredByLastLastMonthCategory }, () => this.amountByLastLastMonthCategory())
      } else {
        console.log("in filterByCategory, filteredTransactions array is empty!!!")
      }
    })

    this.setState({ value }, () => {
      if(this.state.filteredLastMonth.length > 0) {
        let filteredByLastMonthCategory = this.state.filteredLastMonth.filter(trans => {
          return this.state.value === trans.category_id
        })
        this.setState({ filteredByLastMonthCategory }, () => this.amountByLastMonthCategory())
      } else {
        console.log("in filterByCategory, filteredByLastMonthCategory array is empty!!!")
      }
    })
  }

  // calculates total spending for each category, each month
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
        total += Math.round(parseFloat(trans.amount)*100/100)
      })
      this.setState({ categorySpent: total })
    } else {
      this.setState({ categorySpent: 0 })
    }
  }

  amountByLastMonthCategory = () => {
    let amount = {}
    let total = 0
    if(this.state.filteredByLastMonthCategory.length > 0) {
      this.state.filteredByLastMonthCategory.forEach(trans => {
        if(amount[trans.category_id]) {
          amount[trans.category_id] += parseFloat(trans.amount)
        } else {
          amount[trans.category_id] = parseFloat(trans.amount)
        }
        total += Math.round(parseFloat(trans.amount)*100/100)
      })
      this.setState({ lastMonth: total })
    } else {
      this.setState({ lastMonth: 0 })
    }
  }

  amountByLastLastMonthCategory = () => {
    let amount = {}
    let total = 0
    if(this.state.filteredByLastMonthCategory.length > 0) {
      this.state.filteredByLastMonthCategory.forEach(trans => {
        if(amount[trans.category_id]) {
          amount[trans.category_id] += parseFloat(trans.amount)
        } else {
          amount[trans.category_id] = parseFloat(trans.amount)
        }
        total += Math.round(parseFloat(trans.amount)*100/100)
      })
      this.setState({ lastLastMonth: total })
    } else {
      this.setState({ lastLastMonth: 0 })
    }
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

  // dynamically shows data depending on state
  areaChartData = () => {
    const data = [
      { name: `${this.lastLastMonth()}`, Amount: this.state.lastLastMonth },
      { name: `${this.lastMonth()}`, Amount: this.state.lastMonth },
      { name: `${this.thisMonth()}`, Amount: this.state.categorySpent }
    ]
    return data
  }

  // category options
  renderOptions = () => {
    const categoryOptions = [
      { key: 1, text: "Bills & Utilities", value: 1 },
      { key: 2, text: "Dining & Drinks", value: 2 },
      { key: 3, text: "Travel", value: 3 },
      { key: 4, text: "Groceries", value: 4 },
      { key: 5, text: "Shopping", value: 5 },
      { key: 6, text: "Commuting & Auto", value: 6 },
      { key: 7, text: "Personal Care", value: 7 },
      { key: 8, text: "Others", value: 8 }
    ]
    return categoryOptions
  }

  render() {
    const { value } = this.state
    return (
      <div className="content-container categorytimeline">
        <Dropdown
          onChange={this.filterByCategory}
          options={this.renderOptions()}
          placeholder='Choose a category'
          selection
          value={value}
        />
        <CategoryAreaChart
          data={this.areaChartData()}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
  transactions: auth.currentUser.transactions
})

export default withRouter(connect(mapStateToProps)(CategoryTimelineContainer))
