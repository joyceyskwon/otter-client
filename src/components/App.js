import React from 'react'
import Nav from './Nav'
import Homepage from './Homepage'
import Transactions from './Transactions'
import Login from './Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

class App extends React.Component {


  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Homepage} />
          <Route path="/profile" component={Transactions} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    )
  }

}

export default App
