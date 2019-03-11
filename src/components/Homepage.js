import React from 'react'
import logo from '../assets/otter.svg'

const Homepage = props => {
  return (
    <div className="homepage-container">
      <img src={logo} alt="otter-logo" className={"homepage-logo"}/>
      <h1>Welcome to Otter!</h1>
      <h3>Live life to the fullest</h3>

    </div>
  )
}

export default Homepage
