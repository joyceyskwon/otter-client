import {
  FETCH_TRANSACTIONS,
  NEW_TRANSACTION,
  FILTER_BY_MONTH,
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

export const filterByMonth = e => dispatch => {
  console.log(e.target);
}

export const fetchCategories = () => dispatch => {
  fetch('http://localhost:3000/api/v1/categories')
  .then(r => r.json())
  .then(categories =>
    dispatch({
      type: FETCH_CATEGORIES,
      payload: categories
    })
  )
}
