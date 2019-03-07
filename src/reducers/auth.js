import {
  POST_NEW_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
  NEW_TRANSACTION,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION
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
    case EDIT_TRANSACTION:
      const updatedTrans = state.currentUser.transactions.map(trans=>{
        if(action.payload.id === trans.id) {
          return action.payload
        } else {
          return trans
        }
      })
      return {
        ...state,
        currentUser: {
          ...state.currentUser, transactions: updatedTrans,
        }
      }
    case DELETE_TRANSACTION:
      const transWithoutDeletedOne = state.currentUser.transactions.filter(trans => trans.id !== action.payload)
      return {
        ...state,
        currentUser: {
          ...state.currentUser, transactions: transWithoutDeletedOne,
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
