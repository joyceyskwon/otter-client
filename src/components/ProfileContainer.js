import React from 'react'
import Homepage from './Homepage'
import { Button, Modal, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { editUser, fetchAllUsers } from '../actions/index'

class ProfileContainer extends React.Component {

  state = {
    open: false,
    name: this.props.currentUser.name,
    username: this.props.currentUser.username,
    bank: this.props.currentUser.bank,
    account_number: this.props.currentUser.account_number,
    monthly_income: this.props.currentUser.monthly_income
  }

  componentDidMount(){
    this.props.fetchAllUsers()
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const updatedUserData = {
      name: this.state.name,
      username: this.state.username,
      bank: this.state.bank,
      account_number: this.state.account_number,
      monthly_income: this.state.monthly_income
    }
    this.props.editUser(updatedUserData, this.props.currentUser.id)
    this.close()
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    console.log("in ProfileContainer", this.props.currentUser)
    if(this.props.currentUser) {
    const { open } = this.state
      return (
        <div className="profile-container">
          <h1>My Profile</h1>
          <img className={"profile-picture"} src={'http://www.stickpng.com/assets/images/585e4beacb11b227491c3399.png'} alt="profile" />
          <h2>Name: {this.props.currentUser.name}</h2>

            <Modal open={open} className={"modal"} trigger={<Button className={"edit-trans-button"} onClick={this.open}>Edit Profile</Button>}>
              <Modal.Header>Edit Profile</Modal.Header>
              <Modal.Content>
                <Form onChange={this.onChange} onSubmit={this.onSubmit}>
                  <Form.Group>
                    <Form.Input
                      width={12}
                      fluid label='Name'
                      type="text"
                      name="name"
                      value={this.state.name}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      width={12}
                      fluid label='Username'
                      type="text"
                      name="username"
                      value={this.state.username}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      width={12}
                      fluid label='Bank Institution'
                      type="text"
                      name="bank"
                      value={this.state.bank}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      width={12}
                      fluid label='Account Number'
                      type="text"
                      name="account_number"
                      value={this.state.account_number}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      width={12}
                      fluid label='Monthly Income'
                      type="text"
                      name="monthly_income"
                      value={this.state.monthly_income}
                    />
                  </Form.Group>
                  <Modal.Actions>
                    <Form.Button className={"new-trans-submit-button"} type="submit">Submit</Form.Button>
                  </Modal.Actions>
                </Form>
              </Modal.Content>
            </Modal>
        </div>
      )
    } else {
      return <Homepage />
    }
  }
}

const mapStateToProps = ({ auth, user }) => ({
  currentUser: auth.currentUser,
  users: user.users
})

export default withRouter(connect(mapStateToProps, { editUser, fetchAllUsers })(ProfileContainer))
