import {
  FETCH_TRANSACTIONS,
  NEW_TRANSACTION,
  FETCH_CATEGORIES,
  POST_NEW_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
  API_ROOT,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_USER,
  FETCH_ALL_USERS
} from './types'

// Was trying to get current user's location
// export const getLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition)
//   } else {
//     console.log("Geolocation is not supported by this browser.")
//   }
// }
//
// export const showPosition = position => {
//   let latlon =  "lat=" + position.coords.latitude +
//   "&lon=" + position.coords.longitude
//   return latlon
// }

// fetches current weather userData
// UNUSED - will use later for homepage
// export const fetchCurrentWeather = () => dispatch => {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=40.7039&lon=74.0139&appid=d6a40e6f59b078301c32fa838e7d5760`)
//   .then(r => r.json())
//   .then(weatherData => {
//     dispatch({
//       type: FETCH_WEATHER,
//       payload: weatherData.weather[0]
//     })
//   })
// }

// UNUSED - DELETE
export const fetchTransactions = userId => dispatch => {
  fetch(`${API_ROOT}/api/v1/users/${userId}`)
  .then(r => r.json())
  .then(userData => {
    dispatch({
      type: FETCH_TRANSACTIONS,
      payload: userData.transactions
    })
  })
}

// used in TransactionForm.js
export const createTransaction = (transactionData) => dispatch => {
  fetch(`${API_ROOT}/api/v1/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(transactionData)
  })
  .then(r => r.json())
  .then(transaction => {
    // debugger
    dispatch({
      type: NEW_TRANSACTION,
      payload: transaction
    })
  })
}

// used in EditTransactionForm.js
export const editTransactions = (transactionData, id) => dispatch => {
  fetch(`${API_ROOT}/api/v1/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(transactionData)
  })
  .then(r => r.json())
  .then(updatedData => {
    dispatch({
      type: EDIT_TRANSACTION,
      payload: updatedData
    })
  })
}

export const deleteTransaction = transactionId => dispatch => {
  fetch(`${API_ROOT}/api/v1/transactions/${transactionId}`, {
    method: 'DELETE'
  })
  dispatch({type: DELETE_TRANSACTION, payload: transactionId})
}

// UNUSED - DELETE
export const fetchCategories = () => dispatch => {
  fetch(`${API_ROOT}/api/v1/categories`)
  .then(r => r.json())
  .then(categories =>
    dispatch({
      type: FETCH_CATEGORIES,
      payload: categories
    })
  )
}

// used in SignUp.js
export const createNewUser = (newUserData, history) => dispatch => {
  fetch(`${API_ROOT}/api/v1/users`, {
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
      history.push('/overview')
    }
  })
}

// fetch all users
export const fetchAllUsers = () => dispatch => {
  fetch(`${API_ROOT}/api/v1/users`)
  .then(r => r.json())
  .then(response =>
    dispatch({
      type: FETCH_ALL_USERS,
      payload: response
    })
  )
}

// updates a user information
export const editUser = (userData, userId) => dispatch => {
  console.log("am I in the actions index.js???");
  fetch(`${API_ROOT}/api/v1/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(r => r.json())
  .then(updatedUserData =>
    dispatch({
    type: UPDATE_USER,
    payload: updatedUserData
    })
  )
}

// used in App.js, when the page refreshes
export const tokenLogin = (token, history) => dispatch => {
  fetch(`${API_ROOT}/api/v1/current_user`, {
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
  history.push('/overview')
}

// used in Login.js
export const loginUser = (username, password, history) => dispatch => {
  fetch(`${API_ROOT}/api/v1/login`, {
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
      history.push('/overview')
    }
  })
}

// used in App.js
export const logout = () => {
  localStorage.removeItem("token")
  return {
    type: LOGOUT_USER
  }
}
