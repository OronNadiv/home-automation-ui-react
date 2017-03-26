import request from 'utils/request'
import { GARAGE_URL } from 'config'
import resolver from 'url-join'

const PREFIX = 'GARAGE'

export const CHANGED_DOOR_STATE = `${PREFIX}_CHANGED_DOOR_STATE`
export const FETCHED_RECENT_STATES = `${PREFIX}_FETCHED_RECENT_STATES`

export const changeDoorState = () => {
  return request({
    method: 'POST',
    uri: resolver(GARAGE_URL, 'toggles')
  }).then(() => {
    return {
      type: CHANGED_DOOR_STATE,
      isSuccess: true
    }
  }).catch(() => {
    return {
      type: CHANGED_DOOR_STATE,
      isSuccess: false
    }
  })
}

export const fetchStates = (count = 20) => {
  return request({
    qs: { count },
    uri: resolver(GARAGE_URL, 'states')
  }).then((states) => {
    return {
      type: FETCHED_RECENT_STATES,
      states
    }
  })
}
