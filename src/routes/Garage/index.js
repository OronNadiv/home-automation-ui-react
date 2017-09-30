import { injectReducer } from '../../store/reducers'

export default (store) => {
  const container = require('./GarageContainer').default
  const reducer = require('./GarageReducers').default
  injectReducer(store, { key: 'garage', reducer })
  return container
}
