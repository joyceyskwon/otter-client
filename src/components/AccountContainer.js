import React from 'react'
import TotalBalance from './TotalBalance'
import Homepage from './Homepage'
import CategoryContainer from './CategoryContainer'
import CategoryTimelineContainer from './CategoryTimelineContainer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCurrentWeather } from '../actions/index'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

class AccountContainer extends React.Component {

  // if the user is logged in, view AccountContainer.js. If not, show homepage
  render() {
    if (this.props.currentUser) {
      return (
        <div className="account-container">
          <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1}}
          >
            <Masonry columnsCount={1}>
              <TotalBalance
                currentUser={this.props.currentUser}
              />
              <CategoryContainer
                transactions={this.props.currentUser.transactions}
              />
              <CategoryTimelineContainer
                transactions={this.props.currentUser.transactions}
              />
            </Masonry>
          </ResponsiveMasonry>
        </div>

    )} else {
      return (
        <Homepage
          currentWeather={this.props.fetchCurrentWeather()}
        />
      )
    }
  }
}

const mapStateToProps = ({ auth, weather }) => ({
  currentUser: auth.currentUser,
  weather: weather.weather
})

export default withRouter(connect(mapStateToProps, { fetchCurrentWeather })(AccountContainer))
