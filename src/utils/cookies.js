import cookie from 'react-cookie'

export const getToken = () => {
  return cookie.load('XSRF-TOKEN')
}
