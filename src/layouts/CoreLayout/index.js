import View from './CoreLayout'
import { connect } from 'react-redux'

import {
  fetchMe
} from 'store/meReducer'

const mapDispatchToProps = {
  fetchMe
}

const mapStateToProps = (state) => {
  return {
    me: state.me.get('data')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
