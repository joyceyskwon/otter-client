import React from 'react'
import Homepage from './Homepage'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const ProfileContainer = props => {
  if(props.currentUser) {
    return (
      <div className="content-container">
      <h1>My Profile</h1>
      <img src={'https://uybor.uz/borless/avtobor/img/user-images/no-avatar.png'} alt="profile" />
      <h2>Name: {props.currentUser.name}</h2>
      </div>
    )
  } else {
    return <Homepage />
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser
})

export default withRouter(connect(mapStateToProps)(ProfileContainer))
