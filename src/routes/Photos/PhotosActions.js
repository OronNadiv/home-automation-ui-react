import request from '../../utils/request'
import { CAMERA_URL } from '../../config'
import resolver from 'url-join'
import moment from 'moment'

const PREFIX = 'PHOTOS'

export const TOKEN_PHOTO = `${PREFIX}_TOKEN_PHOTO`
export const FETCHED_PHOTOS = `${PREFIX}_FETCHED_PHOTOS`

export const takePhoto = ({ count, duration }) => {
  return request({
    method: 'POST',
    uri: resolver(CAMERA_URL, 'take'),
    body: {
      count,
      duration
    }
  }).then(() => {
    return {
      type: TOKEN_PHOTO,
      isSuccess: true
    }
  }).catch(() => {
    return {
      type: TOKEN_PHOTO,
      isSuccess: false
    }
  })
}

export const fetchPhotos = () => {
  const after = moment().subtract(2, 'weeks').toDate().toString()

  return request({
    qs: { after },
    uri: resolver(CAMERA_URL, `files`)
  }).then((photos) => {
    return {
      type: FETCHED_PHOTOS,
      photos
    }
  })
}
