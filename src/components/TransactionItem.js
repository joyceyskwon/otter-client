import React from 'react'
import { Table, Icon, Button, Modal, Form } from 'semantic-ui-react'

class TransactionItem extends React.Component {

  state = {
    name: this.props.name,
    data: this.props.date,
    amount: this.props.amount
  }

  onSubmit = e => {
    e.preventDefault()
    const updatedTrans = {
      
    }
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

  render() {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{this.renderIcons(this.props.category_id)} {this.props.name}</Table.Cell>
          <Table.Cell>{this.props.date}</Table.Cell>
          <Table.Cell><Icon name='dollar sign'/>{this.props.amount}</Table.Cell>
          <Table.Cell>
            <Modal className={"modal"} trigger={<Button className={"edit-trans-button"}>Edit</Button>}>
              <Modal.Header>Edit Transaction</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group>
                    <Form.Input
                      width={12}
                      fluid label='Title'
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      width={6}
                      fluid label='Date'
                      type="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                    <Form.Input
                      width={6}
                      fluid label='Amount'
                      type="number"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.onChange}
                      />
                  </Form.Group>
                  <Modal.Actions>
                    <Form.Button className={"new-trans-submit-button"} type="submit">Submit</Form.Button>
                  </Modal.Actions>
                </Form>
              </Modal.Content>
            </Modal>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    )
  }
}

export default TransactionItem
