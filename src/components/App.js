import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Route, Switch } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.fetchAllTransactions()
  }

  render() {
    return (
      <div className="App">
        <h1>Otter</h1>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  }
}

export default connect(mapStateToProps)(App);
