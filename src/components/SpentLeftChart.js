// props from TotalBalance.js

import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const colors = ['#0088FE', '#FF8042']

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text fontSize="15px" x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const SpentLeftChart = props => {
  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={props.pieData}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#000"
          dataKey="value"
        >
          {
            props.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
          }
        </Pie>
      </PieChart>
    </div>
  )
}

export default SpentLeftChart
