import React from 'react'
import TransactionsList from './TransactionsList'
import TransactionForm from './TransactionForm'
import TotalBalance from './TotalBalance'
import Homepage from './Homepage'
import CategoryList from './CategoryList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header, Icon, Image, Menu, Segment, Grid, Rail } from 'semantic-ui-react'

class AccountContainer extends React.Component {

  state = {}

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { contextRef } = this.state

    if (this.props.currentUser) {return (
      <Grid centered columns={3}>
        <Grid.Column>
          <div>
            <Segment>
              <Rail position='left'>
                <TransactionForm
                  currentUser={this.props.currentUser}
                />
                <hr/>
                <TotalBalance
                  currentUser={this.props.currentUser}
                />
                <hr/>
              </Rail>

              <Rail position='right'>
                <TransactionsList
                  currentUser={this.props.currentUser}
                  transactions={this.props.currentUser.transactions}
                  />
                <hr/>
                <CategoryList
                  transactions={this.props.currentUser.transactions}
                  />
              </Rail>
            </Segment>
          </div>
        </Grid.Column>
      </Grid>

    )} else {
      return(<Homepage />)
    }
  }
}

const mapStateToProps = ({ auth, transactions }) => ({
  currentUser: auth.currentUser,
  newTransaction: transactions.item
})

export default withRouter(connect(mapStateToProps)(AccountContainer))
