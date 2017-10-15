import { fromJS } from 'immutable'
import { CHANGED_DOOR_STATE, FETCHED_RECENT_STATES } from './GarageActions'
import { GARAGE_STATE_CREATED } from '../../store/pubnubReducer'
import moment from 'moment'

const initialState = fromJS({
  states: {
    data: [],
    isLoaded: false
  },
  request: {
    timestamp: 0,
    isSuccess: false
  }
})

const processDoorState = (state) => {
  state.localTimeFormatted = moment.utc(state.updated_at).local().format('l h:mm:ss A')
}

const ACTION_HANDLERS = {
  [CHANGED_DOOR_STATE]: (state = initialState, {isSuccess}) => {
    state = state
      .setIn(['request', 'timestamp'], new Date().valueOf())
      .setIn(['request', 'isSuccess'], isSuccess)
    return state
  },
  [FETCHED_RECENT_STATES]: (state = initialState, {states}) => {
    states.forEach((doorState) => processDoorState(doorState))
    state = state.set('states', fromJS({
      data: states,
      isLoaded: true
    }))
    return state
  },
  [GARAGE_STATE_CREATED]: (state = initialState, {doorState}) => {
    processDoorState(doorState)
    state = state.updateIn(['states', 'data'], (doorStates) => doorStates.unshift(fromJS(doorState)))
    return state
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
