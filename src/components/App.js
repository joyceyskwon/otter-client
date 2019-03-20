import React from 'react'
import Nav from './Nav'
import SideNav from './SideNav'
import Homepage from './Homepage'
import AccountContainer from './AccountContainer'
import TransactionsContainer from './TransactionsContainer'
import ProfileContainer from './ProfileContainer'
import Login from './Login'
import SignUp from './SignUp'
import Footer from './Footer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { createNewUser, loginUser, logout, tokenLogin } from '../actions/index'
import './App.css'

class App extends React.Component {

  // at window refresh, logs in user with token (function from actions/index.js)
  componentDidMount() {
    let token = localStorage.getItem("token")
    if (token) {
      this.props.tokenLogin(token, this.props.history)
    }
  }

  // logs out user (actions/index.js)
  logout = () => {
    this.props.logout(this.props.history)
    this.props.history.push('/login')
    alert("Logging out...")
  }

  render() {
    return (
      <Router>
        <div>

          <Nav
            currentUser={this.props.currentUser}
            logout={this.logout}
          />
        { !this.props.currentUser ?
          ""
          :
          <SideNav
            currentUser={this.props.currentUser}
            />
        }

          <Route exact path="/" component={Homepage} />
          <Route exact path="/overview" component={AccountContainer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/transactions" component={TransactionsContainer} />
          <Route exact path="/profile" component={ProfileContainer} />
        </div>
      </Router>
    )
  }

}

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser
  }
}

export default withRouter(connect(mapStateToProps, { createNewUser, loginUser, logout, tokenLogin })(App))
