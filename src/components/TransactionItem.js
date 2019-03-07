import React from 'react'
import { Table, Icon, Button, Modal, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { editTransactions, deleteTransaction } from '../actions/index'

class TransactionItem extends React.Component {

  state = {
    name: this.props.name,
    date: this.props.date,
    amount: this.props.amount,
    open: false
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const updatedTrans = {
      name: this.state.name,
      date: this.state.date,
      amount: this.state.amount
    }
    // console.log(updatedTrans);
    this.props.editTransactions(updatedTrans, this.props.id)
  }

  handleDelete = () => {
    this.props.deleteTransaction(this.props.id)
  }

  renderIcons = categoryId => {
    switch(categoryId) {
      case 1:
        return <Icon name='money'/>
      case 2:
        return <Icon name='food'/>
      case 3:
        return <Icon name='plane'/>
      case 4:
        return <Icon name='shopping basket'/>
      case 5:
        return <Icon name='shopping cart'/>
      case 6:
        return <Icon name='car'/>
      case 7:
        return <Icon name='lemon outline'/>
      case 8:
        return <Icon name='money bill alternate outline'/>
      default:
        return <Icon name='money'/>
    }
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })

  render() {
    const { open } = this.state
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{this.renderIcons(this.props.category_id)} {this.props.name}</Table.Cell>
          <Table.Cell>{this.props.date}</Table.Cell>
          <Table.Cell><Icon name='dollar sign'/>{this.props.amount}</Table.Cell>
          <Table.Cell>
            <Modal className={"modal"} trigger={<Button className={"edit-trans-button"} onClick={this.open}>Edit</Button>}>
              <Modal.Header>Edit Transaction</Modal.Header>
              <Modal.Content>
                <Form onChange={this.onChange} onSubmit={this.onSubmit}>
                  <Form.Group>
                    <Form.Input
                      width={12}
                      fluid label='Title'
                      type="text"
                      name="name"
                      value={this.state.name}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      width={6}
                      fluid label='Date'
                      type="date"
                      name="date"
                      value={this.state.date}
                      />
                    </Form.Group>
                    <Form.Group>
                    <Form.Input
                      width={6}
                      fluid label='Amount'
                      type="number"
                      name="amount"
                      value={this.state.amount}
                      />
                  </Form.Group>
                  <Modal.Actions>
                    <Form.Button className={"new-trans-submit-button"} type="submit" onClick={this.close}>Submit</Form.Button>
                  </Modal.Actions>
                </Form>
              </Modal.Content>
            </Modal>
          </Table.Cell>
          <Table.Cell><Button onClick={this.handleDelete}>Delete</Button></Table.Cell>
        </Table.Row>
      </Table.Body>
    )
  }
}

export default connect(null, { editTransactions, deleteTransaction })(TransactionItem)
