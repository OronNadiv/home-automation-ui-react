import { fromJS } from 'immutable'
import { FETCHED_PHOTOS, TOKEN_PHOTO } from './PhotosActions'
import { CAMERA_FETCHED_PHOTO } from '../../store/pubnubReducer'
import moment from 'moment'
import { STORAGE_URL } from '../../config'
import resolver from 'url-join'

const initialState = fromJS({
  photos: {
    isLoaded: false,
    data: []
  },
  request: {
    timestamp: 0,
    isSuccess: false
  }
})

const processPhoto = (photo) => {
  const name = photo.name
  const index1 = name.indexOf('-')
  const index2 = name.indexOf('.')
  const time = parseInt(name.substr(index1 + 1, index2 - index1 - 1))
  photo.time = time
  photo.localTimeFormatted = moment(time).format('dddd, MMMM D, gggg h:mm:ss A')
  photo.w = 2592
  photo.h = 1944
  photo.src = resolver(STORAGE_URL, 'files', photo.id)
  return photo
}

const ACTION_HANDLERS = {
  [FETCHED_PHOTOS]: (state = initialState, { photos }) => {
    photos = photos.map(processPhoto)
    photos.sort((photo1, photo2) => photo2.time - photo1.time)
    state = state.set('photos', fromJS({
      data: photos,
      isLoaded: true
    }))
    return state
  },
  [CAMERA_FETCHED_PHOTO]: (state = initialState, { photo }) => {
    photo = processPhoto(photo)
    state = state.updateIn(['photos', 'data'], data => data.unshift(fromJS(photo)))
    return state
  },
  [TOKEN_PHOTO]: (state = initialState, { isSuccess }) => {
    state = state
      .setIn(['request', 'timestamp'], new Date().valueOf())
      .setIn(['request', 'isSuccess'], isSuccess)
    return state
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
