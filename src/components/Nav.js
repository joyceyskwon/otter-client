import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = props => {
  return (
    <nav>
      <h1>Otter</h1>
      <NavLink exact to="/" activeClassName="selected-link">Home</NavLink>
      <NavLink exact to="/profile" activeClassName="selected-link">Profile</NavLink>
      <NavLink exact to="/login" activeClassName="selected-link">Login</NavLink>
    </nav>
  )
}

export default Nav
