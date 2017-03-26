import { injectReducer } from 'store/reducers'

export default (store) => {
  const container = require('./AlarmContainer').default
  const reducer = require('./AlarmReducers').default
  injectReducer(store, { key: 'alarm', reducer })
  return container
}
