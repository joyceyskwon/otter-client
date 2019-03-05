import React from 'react'

const CategoryFilter = props => {
  return (
    <select
      name="name"
      onChange={e=>props.filterByCategory(e)}
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
  )
}

export default CategoryFilter
