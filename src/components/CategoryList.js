// props from AccountContainer.js

import React from 'react'
import { PieChart, Pie, Sector } from 'recharts'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const today = new Date()

const data = [
  { name: 'Bills & Utilities', value: 400 },
  { name: 'Dining & Drinks', value: 300 },
  { name: 'Travel', value: 300 },
  { name: 'Groceries', value: 100 },
  { name: 'Shopping', value: 0 },
  { name: 'Commuting & Auto', value: 0 },
  { name: 'Personal Care', value: 0 },
  { name: 'Others', value: 0 }
]

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

class CategoryList extends React.Component {

  state = {
    filteredTransactions: [],
    amountArray: [],
    totalSpending: 0,
    activeIndex: 0,
  }

  // filters transactions by selected month options
  filterByMonth = e => {
    let filteredTransactions = this.props.transactions.filter(transaction => {
      return parseInt(e.target.value) === this.getMonth(transaction)
    })
    this.setState({
      filteredTransactions
    })
  }


  // get total spending for that month
  // filtered transactions need their own component (conditional rendering)
  // from filtered transactions component, create select by category
  // filter them by category
  // calculate the percentages of each category (total amount of a category / total spending that month)
  // get total spending of that month
  // get total spending of a category from that month
  //

  // gets today's month
  getThisMonth = () => {
    const today = new Date()
    const thisMonth = today.getMonth() + 1
    return thisMonth
  }

  // gets a single transaction's date's month
  getMonth = transaction => {
    let monthInt = parseInt(transaction.date.split("-")[1])
    return monthInt
  }

  // FOR MONTHLY FILTER //
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

  getSum = (total, num) => {
    return total + num
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div>
        <h3>Sort by Month</h3>

        <select
          name="date"
          onChange={e=>this.filterByMonth(e)}
        >
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

        Total spending: ${this.state.totalSpending}
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
        <select
          name="name"
          onChange={this.onChange}
        >
          <option value="1">Bills & Utilities</option>
          <option value="2">Dining & Drinks</option>
          <option value="3">Travel</option>
          <option value="4">Groceries</option>
          <option value="5">Shopping</option>
          <option value="6">Commuting & Auto</option>
          <option value="7">Personal Care</option>
          <option value="8">Others</option>
        </select>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
  transactions: auth.currentUser.transactions
})

export default withRouter(connect(mapStateToProps)(CategoryList))
