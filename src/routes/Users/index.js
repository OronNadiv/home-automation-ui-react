import { injectReducer } from '../../store/reducers'

export default (store) => {
  const container = require('./UsersContainer').default
  const reducer = require('./UsersReducers').default
  injectReducer(store, { key: 'users', reducer })
  return container
}
