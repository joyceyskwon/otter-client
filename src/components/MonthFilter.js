// props from CategoryContainer.js

import React from 'react'

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const today = new Date()

class MonthFilter extends React.Component {

  getMonth = transaction => {
    let monthInt = parseInt(transaction.date.split("-")[1])
    return monthInt
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
    return (
      <select
        name="date"
        onChange={e=>this.props.filterByMonth(e)}
      >
        <option>Please choose month</option>
        <option
          value={today.getMonth() + 1}
        >
        {this.thisMonth()}
        </option>
        <option
          value={today.getMonth()}
        >
        {this.lastMonth()}
        </option>
        <option
          value={this.lastLastMonthValue()}
        >
        {this.lastLastMonth()}
        </option>
      </select>
    )
  }
}

export default MonthFilter
