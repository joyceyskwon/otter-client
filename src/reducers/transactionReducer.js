import {
  FETCH_TRANSACTIONS,
  NEW_TRANSACTION,
  FILTER_TRANSACTIONS
} from '../actions/types'

const initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        items: action.payload
      }
    case NEW_TRANSACTION:
      return {
        ...state,
        item: action.payload
      }
    case FILTER_TRANSACTIONS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}
