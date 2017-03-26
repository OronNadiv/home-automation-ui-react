import { fromJS } from 'immutable'
import {
  FETCHED_USERS,
  FETCHING_USER,
  FETCHED_USER,
  UPDATED_USER,
  CREATED_USER
} from './UsersActions'

const initialState = fromJS({
  users: {
    data: [],
    isLoaded: false
  },
  user: {
    data: {},
    isLoaded: false
  }
})

const ACTION_HANDLERS = {
  [FETCHED_USERS]: (state = initialState, { users }) => {
    state = state.set('users', fromJS({
      isLoaded: true,
      data: users
    })).sort((a, b) => {
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      if (a === b) {
        return 0
      }
    })
    return state
  },
  [FETCHING_USER]: (state = initialState) => {
    state = state.set('user', fromJS({
      isLoaded: false,
      data: {}
    }))
    return state
  },
  [FETCHED_USER]: (state = initialState, { user }) => {
    state = state.set('user', fromJS({
      isLoaded: true,
      data: user
    }))
    return state
  },
  [UPDATED_USER]: (state = initialState, { user }) => {
    const index = state.getIn(['users', 'data']).findIndex((tUser) => user.id === tUser.get('id'))
    state = state.setIn(['users', 'data', index], fromJS(user))
    return state
  },
  [CREATED_USER]: (state = initialState, { user }) => {
    state = state.updateIn(['users', 'data'], (data) => data.unshift(fromJS(user)))
    return state
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
