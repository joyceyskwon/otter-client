import {
  FETCH_TRANSACTIONS,
  NEW_TRANSACTION,
  FILTER_BY_MONTH,
  FETCH_CATEGORIES,
  POST_NEW_USER,
  SET_CURRENT_USER,
  LOGOUT_USER
} from './types'

export const fetchTransactions = userId => dispatch => {
  fetch(`http://localhost:3000/api/v1/users/${userId}`)
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

export const createNewUser = newUserData => dispatch => {
  fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newUserData)
  })
  .then(r => r.json())
  .then(newUser => {
    if (newUser.errors) {
      alert(newUser.errors)
    } else {
      localStorage.setItem("token", newUser.token)
      dispatch({
        type: POST_NEW_USER,
        payload: newUser
      })
    }
  })
}

export const loginUser = (username, password) => dispatch => {
  console.log("WE ARE IN LOGINUSER")
  console.log({username})
  console.log({password})
  fetch('http://localhost:3000/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username, password
    })
  })
  .then(r => r.json())
  .then(user => {
    console.log("in loginUser actions ", user.user)
    if (user.errors) {
      alert(user.errors)
    } else {
      localStorage.setItem("token", user.token)
      dispatch({
        type: SET_CURRENT_USER,
        payload: user.user
      })
    }
  })
}

export const logout = userId => dispatch => {
  dispatch({
    type: LOGOUT_USER
  })
  localStorage.removeItem("token")
}
