// props from CategoryContainer.js

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const CategoryAreaChart = props => {
  return (
    <AreaChart
      width={500}
      height={400}
      data={props.data}
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#FF8042" fill="#FF8042" />
    </AreaChart>
  )
}

export default CategoryAreaChart
