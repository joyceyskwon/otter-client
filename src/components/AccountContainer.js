import React from 'react'
import TotalBalance from './TotalBalance'
import Homepage from './Homepage'
import CategoryContainer from './CategoryContainer'
import CategoryTimelineContainer from './CategoryTimelineContainer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AccountContainer extends React.Component {

  // if the user is logged in, view AccountContainer.js. If not, show homepage
  render() {
    if (this.props.currentUser) {
      return (
        <div className={"account-container"}>
          <TotalBalance
            currentUser={this.props.currentUser}
          />

          <CategoryContainer
            transactions={this.props.currentUser.transactions}
          />

          <CategoryTimelineContainer
            transactions={this.props.currentUser.transactions}
          />
        </div>
    )} else {
      return (
        <Homepage />
      )
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser
})

export default withRouter(connect(mapStateToProps)(AccountContainer))
