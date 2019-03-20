import {
  FETCH_ALL_USERS,
  UPDATE_USER
} from '../actions/types'

const initialState = {
  users: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_ALL_USERS:
      return {
        ...state,
        users: action.payload
      }
    case UPDATE_USER:
      const updatedUser = state.users.map(user => {
        if(action.payload.id === user.id) {
          return action.payload
        } else {
          return user
        }
      })
      return {
        ...state,
        users: updatedUser
      }
    default:
      return state
  }
}
