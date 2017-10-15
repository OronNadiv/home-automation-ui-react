import { LOGIN_URL } from '../config'
import { getToken } from '../utils/cookies'
import { Subscriber, ListenerStatuses } from 'home-automation-pubnub'

const {subscribe} = Subscriber
const {
  CONNECTED,
  ACCESS_DENIED,
  RECONNECTED
} = ListenerStatuses

const PREFIX_PUBNUB = 'PUBNUB'
export const ALARM_TOGGLE_CREATED = `${PREFIX_PUBNUB}_ALARM_TOGGLE_CREATED`
export const CAMERA_FETCHED_PHOTO = `${PREFIX_PUBNUB}_FETCHED_PHOTO`
export const GARAGE_STATE_CREATED = `${PREFIX_PUBNUB}_DOOR_STATE_CREATED`
export const PN_CONNECTION = `${PREFIX_PUBNUB}_PN_CONNECTION`

export const initialize = (me) => {
  return (dispatch) => {
    const onStatus = (status) => {
      const {statusCode, category} = status
      console.log('status:', status)
      if (!statusCode) {
        return
      }
      switch (status.category) {
        case CONNECTED:
        case RECONNECTED:
          return dispatch({
            type: PN_CONNECTION
          })
        case ACCESS_DENIED:
          console.log('PubNub returned forbidden.  Redirecting to login...',
            'category:', category)
          window.location.href = LOGIN_URL
          return
        default:
          return console.error('Unhandled status code.',
            'status:', status)
      }
    }
    const onMessage = ({system, type, payload}) => {
      console.info('received message.',
        'system:', system,
        'type:', type,
        'payload:', payload)
      switch (system) {
        case 'ALARM':
          switch (type) {
            case 'TOGGLE_CREATED':
              return dispatch({
                type: ALARM_TOGGLE_CREATED,
                toggle: payload
              })
          }
          return
        case 'STORAGE': {
          switch (type) {
            case 'FILE_CREATED':
              return dispatch({
                type: CAMERA_FETCHED_PHOTO,
                photo: payload
              })
          }
          return
        }
        case 'GARAGE': {
          switch (type) {
            case 'STATE_CREATED':
              return dispatch({
                type: GARAGE_STATE_CREATED,
                doorState: payload
              })
          }
        }
      }
    }

    subscribe(
      {groupId: me.group_id, isTrusted: me.is_trusted, token: getToken()},
      onMessage, onStatus
    )
  }
}
