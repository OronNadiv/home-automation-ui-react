import View from './AlarmView'
import { fetchMe } from 'store/meReducer'
import { connect } from 'react-redux'

import {
  fetchAcks,
  fetchMotions,
  fetchToggles,
  changeAlarmState
} from './AlarmActions'

const mapDispatchToProps = {
  fetchAcks,
  fetchMotions,
  fetchToggles,
  changeAlarmState,
  fetchMe
}

const mapStateToProps = (state) => {
  return {
    me: state.me.get('data'),
    lastAuthenticated: state.me.get('lastAuthenticated'),

    acks: state.alarm.getIn(['acks', 'data']),
    motions: state.alarm.getIn(['motions', 'data']),
    toggles: state.alarm.getIn(['toggles', 'data']),

    requestTimestamp: state.alarm.getIn(['request', 'timestamp']),
    requestIsSuccess: state.alarm.getIn(['request', 'isSuccess']),
    isArmed: state.alarm.get('isArmed')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
