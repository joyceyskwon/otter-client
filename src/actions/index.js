import {
  FETCH_TRANSACTIONS,
  NEW_TRANSACTION,
  FETCH_CATEGORIES,
  POST_NEW_USER,
  SET_CURRENT_USER,
  LOGOUT_USER
} from './types'

export const fetchTransactions = userId => dispatch => {
  fetch(`http://localhost:3000/api/v1/users/${userId}`)
  .then(r => r.json())
  .then(userData => {
      dispatch({
      type: FETCH_TRANSACTIONS,
      payload: userData.transactions
    })
  })
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
  .then(transaction => {
    dispatch({
      type: NEW_TRANSACTION,
      payload: transaction
    })
  })
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

export const createNewUser = (newUserData, history) => dispatch => {
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
    console.log("in createNewUser");
    console.log(newUser)
    if (newUser.errors) {
      alert(newUser.errors)
      history.push('/signup')
    } else {
      localStorage.setItem("token", newUser.token)
      dispatch({
        type: POST_NEW_USER,
        payload: newUser
      })
      history.push('/profile')
    }
  })
}

export const tokenLogin = (token, history) => dispatch => {
  fetch('http://localhost:3000/api/v1/current_user', {
    headers: {
      "Authorization": token
    }
  })
  .then(r => r.json())
  .then(response => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: response
    })
  })
  history.push('/profile')
}

export const loginUser = (username, password, history) => dispatch => {
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
    if (user.errors) {
      alert(user.errors)
      history.push('/login')
    } else {
      localStorage.setItem("token", user.token)
      dispatch({
        type: SET_CURRENT_USER,
        payload: user.user
      })
      history.push('/profile')
    }
  })
}

export const logout = userId => dispatch => {
  dispatch({
    type: LOGOUT_USER
  })
  localStorage.removeItem("token")
}
