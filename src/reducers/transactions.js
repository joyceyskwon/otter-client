import {
  FETCH_ALL_TRANSACTIONS
} from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TRANSACTIONS:
      return [...action.transactions]
    default:
      return state
  }
}
