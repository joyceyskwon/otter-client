import {
  FETCH_TRANSACTIONS,
  NEW_TRANSACTION,
  FILTER_BY_MONTH,
  EDIT_TRANSACTION
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
        items: [...state.items, action.payload],
        item: action.payload
      }
    case EDIT_TRANSACTION:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    default:
      return state
  }
}
