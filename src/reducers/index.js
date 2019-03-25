import { combineReducers } from 'redux'
import transaction from './transaction'
import category from './category'
import auth from './auth'
import user from './user'
// import weather from './weather'

export default combineReducers({
  transactions: transaction,
  categories: category,
  auth: auth,
  user: user
})
