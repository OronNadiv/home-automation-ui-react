import View from './GarageView'
import { connect } from 'react-redux'
import { fetchMe } from '../../store/meReducer'
import {
  fetchStates,
  changeDoorState
} from './GarageActions'

const mapDispatchToProps = {
  fetchMe,
  fetchStates,
  changeDoorState
}

const mapStateToProps = (state) => {
  return {
    me: state.me.get('data'),
    lastAuthenticated: state.me.get('lastAuthenticated'),
    states: state.garage.getIn(['states', 'data']),
    requestTimestamp: state.garage.getIn(['request', 'timestamp']),
    requestIsSuccess: state.garage.getIn(['request', 'isSuccess'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
