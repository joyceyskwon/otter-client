import {
  FETCH_TRANSACTIONS,
  NEW_TRANSACTION,
  FILTER_TRANSACTIONS,
  FETCH_CATEGORIES
} from './types'

export const fetchTransactions = () => dispatch => {
  fetch('http://localhost:3000/api/v1/users/1')
  .then(r => r.json())
  .then(userData =>
    dispatch({
      type: FETCH_TRANSACTIONS,
      payload: userData.transactions
    })
  )
}

export const createTransaction = (transactionData) => dispatch => {
  fetch('http://localhost:3000/api/v1/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(transactionData)
  })
  .then(r => r.json())
  .then(transaction =>
    dispatch({
      type: NEW_TRANSACTION,
      payload: transaction
    })
  )
}

export const filterTransactions = (transactions, e) => dispatch => {
  let filteredTransactions = transactions.filter(transaction => {
    return transaction.category_id === e.target.value
  })
  dispatch({
    type: FILTER_TRANSACTIONS,
    payload: filteredTransactions
  })
}

export const fetchCategories = () => dispatch => {
  fetch('http://localhost:3000/api/v1/categories')
  .then(r => r.json())
  .then(categories =>
    dispatch({
      type: FETCH_CATEGORIES,
      payload: categories.transactions
    }))
}
