import View from './PhotosView'
import { connect } from 'react-redux'

import {
  fetchPhotos,
  takePhoto
} from './PhotosActions'

const mapDispatchToProps = {
  fetchPhotos,
  takePhoto
}

const mapStateToProps = (state) => {
  return {
    requestTimestamp: state.photos.getIn(['request', 'timestamp']),
    requestIsSuccess: state.photos.getIn(['request', 'isSuccess']),
    photos: state.photos.getIn(['photos', 'data'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
