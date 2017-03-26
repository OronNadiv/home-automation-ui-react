import resolver from 'url-join'
import { LOGIN_URL } from 'config'
import request from 'utils/request'
import { Map as IMap } from 'immutable'

const PREFIX = 'USERS'

export const FETCHED_USERS = `${PREFIX}_FETCHED_USERS`
export const FETCHING_USER = `${PREFIX}_FETCHING_USER`
export const FETCHED_USER = `${PREFIX}_FETCHED_USER`
export const UPDATED_USER = `${PREFIX}_UPDATED_USER`
export const CREATED_USER = `${PREFIX}_CREATED_USER`

export const fetchUsers = () => {
  return request({
    method: 'GET',
    uri: resolver(LOGIN_URL, 'users')
  })
    .then((users) => {
      return {
        type: FETCHED_USERS,
        users
      }
    })
}

export const fetchUser = (id) => {
  return (dispatch) => {
    dispatch({
      type: FETCHING_USER
    })

    if (!id) {
      return dispatch({
        type: FETCHED_USER,
        user: new IMap({
          id: 0,
          name: '',
          email: '',
          password: '',
          role: 'regular',
          is_active: true
        })
      })
    }

    return request({
      method: 'GET',
      uri: resolver(LOGIN_URL, 'users', id)
    })
      .then((user) => {
        dispatch({
          type: FETCHED_USER,
          user
        })
      })
  }
}

export const updateUser = (id, values) => {
  return (dispatch) => {
    return request({
      body: values,
      method: 'PATCH',
      uri: resolver(LOGIN_URL, 'users', id)
    })
      .then((user) => {
        dispatch({
          type: UPDATED_USER,
          user
        })
      })
  }
}

export const createUser = (values) => {
  return (dispatch) => {
    return request({
      body: values,
      method: 'POST',
      uri: resolver(LOGIN_URL, 'users')
    }).then((user) => {
      dispatch({
        type: CREATED_USER,
        user
      })
    })
  }
}
