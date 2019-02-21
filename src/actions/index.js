import {
  FETCH_ALL_TRANSACTIONS
} from './types'

export const fetchAllTransactions = () => dispatch => {
    fetch('http://localhost:3000/api/v1/transactions')
    .then(r=>r.json())
    .then(transactions => {
      dispatch({ type: FETCH_ALL_TRANSACTIONS, transactions })
    })
  }
}
