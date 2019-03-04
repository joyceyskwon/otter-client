import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Nav = props => {
  return (
    <Menu fixed='top' inverted>
      <Link to="/" className="item">O T T E R</Link>
      {
        !props.currentUser ?
        <Menu.Menu position="right">
          <Link to="/login" className="item">Login</Link>
        </Menu.Menu>
        :
        <Menu.Menu position="right">
          <Menu.Item>Welcome {props.currentUser.name}</Menu.Item>
          <Menu.Item onClick={props.logout}>Log out</Menu.Item>
        </Menu.Menu>
      }
    </Menu>
  )
}

export default Nav
