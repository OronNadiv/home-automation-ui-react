import request from '../utils/request'
import { fromJS } from 'immutable'
import { LOGIN_URL, PUSH_URL } from '../config'
import resolver from 'url-join'
import { getToken } from '../utils/cookies'
import IO from 'socket.io-client'

const PREFIX_ME = 'ME'
const PREFIX_SOCKET_UI = 'ME'

export const FETCHING_ME = `${PREFIX_ME}_FETCHING_ME`
export const FETCHED_ME = `${PREFIX_ME}_FETCHED_ME`
export const AUTHENTICATED = `${PREFIX_SOCKET_UI}_AUTHENTICATED`
export const DOOR_STATE_CREATED = `${PREFIX_SOCKET_UI}_DOOR_STATE_CREATED`
export const ALARM_TOGGLE_CREATED = `${PREFIX_SOCKET_UI}_ALARM_TOGGLE_CREATED`
export const FETCHED_PHOTO = `${PREFIX_SOCKET_UI}_FETCHED_PHOTO`

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
        dispatch(initializeSocketIO(me))
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
  [FETCHED_ME]: (state = initialState, { me }) => {
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
  [AUTHENTICATED]: (state = initialState) => {
    return state.set('lastAuthenticated', new Date().valueOf())
  }
}

export default function reducer (state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export const initializeSocketIO = (me) => {
  return (dispatch) => {
    const suffix = me.is_trusted ? '-trusted' : ''
    const url = resolver(PUSH_URL, me.group_id + suffix)
    const io = IO.connect(url)
    io.on('connect', () => {
      const token = getToken()
      io.emit('authenticate', { token: token })
    })

    io.on('authenticated', () => {
      io.emit('join', ['sirens', 'alarm-sensors', 'storage', 'garage-doors'])
      dispatch({ type: AUTHENTICATED })
    })
    io.on('unauthorized', (err) => {
      console.log('unauthorized called.  err:', err)
      window.location.href = LOGIN_URL
    })
    // io.on('disconnect', () => {
    //   console.log('disconnect called.  Disconnected from server.')
    // })
    // io.on('error', (err) => {
    //   console.log('error called.  err:', err)
    // })

    io.on('STATE_CREATED', (state) => {
      dispatch({
        type: DOOR_STATE_CREATED,
        doorState: state
      })
    })

    io.on('TOGGLE_CREATED', (toggle) => {
      dispatch({
        type: ALARM_TOGGLE_CREATED,
        toggle
      })
    })

    io.on('FILE_CREATED', (photo) => {
      dispatch({
        type: FETCHED_PHOTO,
        photo
      })
    })
  }
}
