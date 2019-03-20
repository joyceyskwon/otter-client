import React from 'react'
import logo from '../assets/otter.svg'
import { connect } from 'react-redux'

const Homepage = props => {

  return (
    !props.currentUser ?
        <div className="logged-out-homepage-container">
          <img src={logo} alt="otter-logo" className={"homepage-logo"}/>
          <h1>Welcome to Otter!</h1>
          <h3>Live life to the fullest</h3>
        </div>
      
    :

        <div className="homepage-container">
          <img src={logo} alt="otter-logo" className={"homepage-logo"}/>
          <h1>Welcome to Otter!</h1>
          <h3>Live life to the fullest</h3>
        </div>
    )

}

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser
  }
}

export default connect(mapStateToProps)(Homepage)
