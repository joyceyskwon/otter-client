import React from 'react'
import { connect } from 'react-redux'

const CategoryItem = props => {

  return (
    <div>
      <h2>I'm a Category Item</h2>
      <p>Total amount spent this month: $***.**</p>
      <p>Bill & Utilities: 20%</p>
      <p>Food & Drinks: 50%</p>
      <p>Travel: 10%</p>
      <p>...</p>
    </div>
  )
}

export default connect()(CategoryItem)
