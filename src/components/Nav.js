import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Nav = props => {
  return (
    <Menu>
      <Link to="/" className="item">Otter</Link>
      {!props.currentUser ?
        <Menu.Menu position="right">
          <Link to="/login" className="item">Login</Link>
        </Menu.Menu>
      :
        <Menu.Menu position="right">
          <Link to="/profile" className="item">Profile</Link>
          <Menu.Item onClick={props.logout}>Log out</Menu.Item>
        </Menu.Menu>
      }
    </Menu>
  )
}

export default Nav
