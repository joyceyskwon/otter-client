import React from 'react'
import TotalBalance from './TotalBalance'
import Homepage from './Homepage'
import CategoryContainer from './CategoryContainer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCurrentWeather } from '../actions/index'
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
                <CategoryContainer
                  transactions={this.props.currentUser.transactions}
                />
              </Rail>
            </Grid.Column>
          </Grid>
        </div>

    )} else {
      return(
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
