import resolver from 'url-join'
import { ALARM_URL } from '../../config'
import request from '../../utils/request'

const PREFIX = 'ALARM'

export const FETCHED_RECENT_TOGGLES = `${PREFIX}_FETCHED_RECENT_TOGGLES`
export const FETCHED_RECENT_MOTIONS = `${PREFIX}_FETCHED_RECENT_MOTIONS`
export const FETCHED_RECENT_ACKS = `${PREFIX}_FETCHED_RECENT_ACKS`
export const CHANGED_ALARM_STATE = `${PREFIX}_CHANGED_ALARM_STATE`

export const fetchAcks = (count = 20) => {
  return request({
    qs: { count },
    uri: resolver(ALARM_URL, 'acks')
  }).then((acks) => {
    return {
      type: FETCHED_RECENT_ACKS,
      acks
    }
  })
}

export const fetchMotions = (count = 20) => {
  return request({
    qs: { count },
    uri: resolver(ALARM_URL, 'motions')
  }).then((motions) => {
    return {
      type: FETCHED_RECENT_MOTIONS,
      motions
    }
  })
}

export const fetchToggles = (count = 20) => {
  return request({
    qs: { count },
    uri: resolver(ALARM_URL, 'toggles')
  }).then((toggles) => {
    return {
      type: FETCHED_RECENT_TOGGLES,
      toggles
    }
  })
}

export const changeAlarmState = (isArmed) => {
  return request({
    body: { is_armed: isArmed },
    method: 'POST',
    uri: resolver(ALARM_URL, 'toggles')
  }).then(() => {
    return {
      type: CHANGED_ALARM_STATE,
      isSuccess: true,
      isArmed
    }
  }).catch(() => {
    return {
      type: CHANGED_ALARM_STATE,
      isSuccess: false,
      isArmed: null
    }
  })
}
