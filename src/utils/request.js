import requestPromised from 'request-promise'
import { LOGIN_URL } from '../config'
import { getToken } from './cookies'

const request = requestPromised.defaults({ json: true })

export default (options) => {
  if (typeof options === 'string') {
    options = { method: 'GET', uri: options }
  }

  const bearer = getToken()
  if (!bearer) {
    // redirects to login page.
    return window.location.href = LOGIN_URL
  }

  options.auth = {
    bearer
  }

  return request(options)
    .catch((ex) => {
      const { statusCode } = ex
      if (statusCode !== 401) {
        throw ex
      }

      // redirects to login page.
      window.location.href = LOGIN_URL
    })
}
