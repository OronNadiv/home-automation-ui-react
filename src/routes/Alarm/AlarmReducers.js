import { fromJS } from 'immutable'
import moment from 'moment'
import {
  FETCHED_RECENT_ACKS,
  FETCHED_RECENT_MOTIONS,
  FETCHED_RECENT_TOGGLES,
  CHANGED_ALARM_STATE
} from './AlarmActions'
import { ALARM_TOGGLE_CREATED } from '../../store/pubnubReducer'

const initialState = fromJS({
  acks: {
    data: [],
    isLoaded: false
  },
  motions: {
    data: [],
    isLoaded: false
  },
  toggles: {
    data: [],
    isLoaded: false
  },
  request: {
    timestamp: 0,
    isSuccess: false
  },
  isArmed: false
})

const processEvent = (event) => {
  event.localTimeFormatted = moment.utc(event.updated_at).local().format('l h:mm:ss A')
  return event
}

const ACTION_HANDLERS = {
  [FETCHED_RECENT_ACKS]: (state = initialState, { acks }) => {
    acks.forEach((ack) => processEvent(ack))
    state = state.set('acks', fromJS({
      data: acks,
      isLoaded: true
    }))
    return state
  },
  [FETCHED_RECENT_TOGGLES]: (state = initialState, { toggles }) => {
    toggles.forEach((toggle) => processEvent(toggle))
    state = state.set('toggles', fromJS({
      data: toggles,
      isLoaded: true
    }))
    state = state.set('isArmed', toggles.length && toggles[0].is_armed)
    return state
  },
  [FETCHED_RECENT_MOTIONS]: (state = initialState, { motions }) => {
    motions.forEach((motion) => processEvent(motion))
    state = state.set('motions', fromJS({
      data: motions,
      isLoaded: true
    }))
    return state
  },

  [ALARM_TOGGLE_CREATED]: (state = initialState, { toggle }) => {
    processEvent(toggle)
    state = state
      .updateIn(['toggles', 'data'], (toggles) => toggles.unshift(fromJS(toggle)))
      .set('isArmed', toggle.is_armed)
    return state
  },
  [CHANGED_ALARM_STATE]: (state = initialState, { isSuccess, isArmed }) => {
    state = state
      .setIn(['request', 'timestamp'], new Date().valueOf())
      .setIn(['request', 'isSuccess'], isSuccess)
    if (isSuccess) {
      state = state.set('isArmed', isArmed)
    }
    return state
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
