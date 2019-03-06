import {
  POST_NEW_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
  NEW_TRANSACTION
} from '../actions/types'

const initialState = {
  currentUser: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case POST_NEW_USER:
      return {
        ...state,
        currentUser: action.payload.user
      }
    case NEW_TRANSACTION:
      return {
        ...state,
        currentUser: {
          ...state.currentUser, transactions: [
            ...state.currentUser.transactions, action.payload
          ],
        }
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null
      }
    default:
      return state
  }
}
