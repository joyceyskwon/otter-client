import React from 'react'
import MonthFilter from './MonthFilter'
import { PieChart, Pie, Sector } from 'recharts'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const data = [
  { name: 'Bills & Utilities', value: 400 },
  { name: 'Dining & Drinks', value: 300 },
  { name: 'Groceries', value: 300 },
  { name: 'Shopping', value: 200 },
];

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

  getMonth = transaction => {
    const date = new Date(transaction.date)
    const month = date.getMonth() + 1
    return month
  }

  getSum = (total, num) => {
    return total + num
  }

  filterByMonth = (e) => {
    let filteredTransactions = this.props.transactions.filter(transaction => {
      return e.target.value === this.getMonth(transaction)
    })
    this.setState({
      filteredTransactions
    },()=>console.log(this.state.filteredTransactions))
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
        <MonthFilter
          filterByMonth={this.filterByMonth}
        />
        <hr/>
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
        <hr/>
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

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  transactions: state.auth.currentUser.transactions
})

export default withRouter(connect(mapStateToProps)(CategoryList))
