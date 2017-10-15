import request from '../utils/request'
import { fromJS } from 'immutable'
import { LOGIN_URL } from '../config'
import resolver from 'url-join'
import { initialize as initializePubNub, PN_CONNECTION } from './pubnubReducer'

const PREFIX_ME = 'ME'

export const FETCHING_ME = `${PREFIX_ME}_FETCHING_ME`
export const FETCHED_ME = `${PREFIX_ME}_FETCHED_ME`

export const fetchMe = () => {
  return (dispatch, getState) => {
    if (getState().me.get('isLoading') || getState().me.get('isLoaded')) {
      return
    }
    dispatch({
      type: FETCHING_ME
    })
    return request(resolver(LOGIN_URL, 'users', 'me'))
      .then(me => {
        dispatch(initializePubNub(me))
        dispatch({
          type: FETCHED_ME,
          me
        })
      })
  }
}

const initialState = fromJS({
  data: {},
  isLoaded: false,
  isLoading: false,
  lastAuthenticated: 0
})

const ACTION_HANDLERS = {
  [FETCHED_ME]: (state = initialState, {me}) => {
    state = state.merge(fromJS({
      data: me,
      isLoaded: true,
      isLoading: false
    }))
    return state
  },
  [FETCHING_ME]: (state = initialState) => {
    state = state.set('isLoading', true)
    return state
  },
  [PN_CONNECTION]: (state = initialState) => {
    return state.set('lastAuthenticated', new Date().valueOf())
  }
}

export default function reducer (state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
