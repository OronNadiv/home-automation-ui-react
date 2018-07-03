import resolver from 'url-join'
import { LOGIN_URL } from '../../config'
import request from '../../utils/request'

const PREFIX = 'LOGIN'

export const UPDATED_LOGIN = `${PREFIX}_UPDATED_LOGIN`

export const updateLogin = (id, values) => {
  return request({
    body: values,
    method: 'PATCH',
    uri: resolver(LOGIN_URL, id.toString())
  }).then((user) => {
    return {
      type: UPDATED_LOGIN,
      user
    }
  })
}
