import requestPromised from 'request-promise'
import { LOGIN_URL } from 'config'
import { getToken } from './cookies'

const request = requestPromised.defaults({ json: true })

export default (options) => {
  if (typeof options === 'string') {
    options = { method: 'GET', uri: options }
  }

  const token = getToken()
  if (!token) {
    window.location.href = LOGIN_URL
  }

  options.auth = {
    bearer: getToken()
  }

  return request(options)
    .catch((ex) => {
      const { statusCode } = ex
      if (statusCode !== 401) {
        throw ex
      }

      window.location.href = LOGIN_URL
    })
}
