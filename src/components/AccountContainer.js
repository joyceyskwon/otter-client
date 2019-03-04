import React from 'react'
import TotalBalance from './TotalBalance'
import Homepage from './Homepage'
import CategoryList from './CategoryList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Rail } from 'semantic-ui-react'

class AccountContainer extends React.Component {

  
  render() {

    if (this.props.currentUser) {
      return (
        <div className="content-container">
          <Grid centered columns={3}>
            <Grid.Column>
              <Rail position='left'>
                <TotalBalance
                  currentUser={this.props.currentUser}
                />
              </Rail>

              <Rail position='right'>
                <CategoryList
                  transactions={this.props.currentUser.transactions}
                />
              </Rail>
            </Grid.Column>
          </Grid>
        </div>

    )} else {
      return(
        <Homepage />
      )
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser
})

export default withRouter(connect(mapStateToProps)(AccountContainer))
