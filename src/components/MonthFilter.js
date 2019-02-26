import React from 'react'
import Filter from './Filter'

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const today = new Date()

class MonthFilter extends React.Component {

  mappedTransactions = () => {
    this.props.transactions.map(transaction => transaction.date)
  }

  thisMonth = () => {
    return monthNames[today.getMonth()]
  }

  lastMonth = () => {
    if (today.getMonth() === 0) {
      return monthNames[12]
    } else {
      return monthNames[today.getMonth() - 1]
    }
  }

  lastLastMonth = () => {
    if (today.getMonth() === 1) {
      return monthNames[11]
    } else if (today.getMonth() === 2) {
      return monthNames[11]
    } else {
      return monthNames[today.getMonth() - 2]
    }
  }

  lastLastMonthValue = () => {
    if (today.getMonth() === 0) {
      return 11
    } else if (today.getMonth() === 1) {
      return 12
    } else {
      return today.getMonth() - 1
    }
  }

  handleFilter = (e) => {
    this.props.filterTransactions(this.props.transactions, e)
  }

  render() {
    return (
      <div>
        <select
          name="date"
          onChange={(e)=>this.props.filterByMonth(e)}
        >
          <option
            value={today.getMonth() + 1}
          >
          This Month: {this.thisMonth()}
          </option>
          <option
            value={today.getMonth()}
          >
          Last month: {this.lastMonth()}
          </option>
          <option
            value={this.lastLastMonthValue()}
          >
          Two months ago: {this.lastLastMonth()}
          </option>
        </select>
        <Filter
          handleCategoryFilter={this.handleCategoryFilter}
        />
      </div>
    )
  }

}

export default MonthFilter
