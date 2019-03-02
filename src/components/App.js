import React from 'react'
import Nav from './Nav'
import Homepage from './Homepage'
import AccountContainer from './AccountContainer'
import Login from './Login'
import SignUp from './SignUp'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { createNewUser, loginUser, logout, tokenLogin } from '../actions/index'
import './App.css'

class App extends React.Component {

  componentDidMount() {
    let token = localStorage.getItem("token")
    if (token) {
      this.props.tokenLogin(token, this.props.history)
    }
  }

  logout = userId => {
    this.props.logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <Router>
        <div>
          <Nav currentUser={this.props.currentUser} logout={this.logout}/>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/profile" component={AccountContainer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    )
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  }
}

export default withRouter(connect(mapStateToProps, { createNewUser, loginUser, logout, tokenLogin })(App))
