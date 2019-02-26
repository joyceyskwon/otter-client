import React from 'react'
import { connect } from 'react-redux'

const CategoryItem = props => {

  return (
    <div>
      <h2>I'm a Category Item</h2>
    </div>
  )
}

export default connect()(CategoryItem)
