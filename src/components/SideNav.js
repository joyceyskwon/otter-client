import React from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SideNav = props => {
  return (
    <Sidebar as={Menu} animation='overlay' icon='labeled' vertical visible width='thin'>
      <Menu.Item>
        <Link to="/overview" className="item"><Icon name='home' />Overview</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/transactions" className="item"><Icon name='list' />Transactions</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='user' />
        Profile
      </Menu.Item>
    </Sidebar>
  )
}

export default SideNav
