import React from 'react'
import Homepage from './Homepage'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ProfileContainer extends React.Component {

  // onChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // onSubmit = e => {
  //   e.preventDefault()
  //   const updatedUserData = {
  //     name: this.state.name,
  //     username: this.state.username,
  //     bank: this.state.bank,
  //     account_number: this.state.account_number,
  //     monthly_income: this.state.monthly_income
  //   }
  //   this.props.editUser(updatedUserData, this.props.currentUser.id)
  //   this.close()
  // }

  // open = () => this.setState({ open: true })
  // close = () => this.setState({ open: false })

  maskAccountNumber = () => this.props.currentUser.account_number.replace(/\d(?=\d{4})/g, "*")

  render() {
    if(this.props.currentUser) {
      return (
        <div className="profile-container">
          <h1>My Profile</h1>
          <img className={"profile-picture"} src={'http://www.stickpng.com/assets/images/585e4beacb11b227491c3399.png'} alt="profile" />
          <h2>{this.props.currentUser.name}</h2>
          <p>Bank: {this.props.currentUser.bank}</p>
          <p>Account Number: {this.maskAccountNumber()}</p>
          <p>Monthly Income: {this.props.currentUser.monthly_income}</p>
        </div>
      )
    } else {
      return <Homepage />
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser
})

export default withRouter(connect(mapStateToProps)(ProfileContainer))
