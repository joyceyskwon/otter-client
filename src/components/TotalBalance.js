import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const data = [
  { name: 'Left', value: 400 },
  { name: 'Spent', value: 800 }
]

const colors = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28']

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

class TotalBalance extends React.Component {

  state = {
    filteredTransactions: [],
    amountArray: []
  }

  componentDidMount() {
    this.filterThisMonthSpending()
  }

  getMonth = transaction => {
    const date = new Date(transaction.date)
    const month = date.getMonth() + 1
    return month
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

  amountArray = () => {
    let amountArray = this.state.filteredTransactions.map(transaction => {
      return parseInt(transaction.amount)
    })
    this.setState({
      amountArray
    })
  }

  getSum = (total, num) => {
    return total + num
  }

  totalSpent = () => {
    let amountArray = this.state.amountArray
    return amountArray.reduce(this.getSum)
  }

  totalLeft = () => {
    let spent = this.totalSpent()
    return this.props.currentUser.monthly_income - spent
  }

  filterThisMonthSpending = () => {
    let month = this.getThisMonth()
    let filteredTransactions = this.props.currentUser.transactions.filter(transaction => {
      return month === this.getMonth(transaction)
    })
    this.setState({
      filteredTransactions
    })
  }

  render() {
    return (
      <div>
        <h1>{this.changeMonthToString()}</h1>
        <p>Income: ${this.props.currentUser.monthly_income}</p>

        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
            }
          </Pie>
        </PieChart>

        <p>Spent:</p>
        <p>Left: </p>
      </div>
    )
  }
}

export default TotalBalance
