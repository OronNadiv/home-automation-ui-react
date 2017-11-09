import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getToken = () => {
  return cookies.get('XSRF-TOKEN')
}
