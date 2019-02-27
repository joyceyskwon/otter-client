import { combineReducers } from 'redux'
import transaction from './transaction'
import category from './category'
import auth from './auth'

export default combineReducers({
  transactions: transaction,
  categories: category,
  auth: auth
})
