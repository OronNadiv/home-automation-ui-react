import { injectReducer } from '../../store/reducers'

export default (store) => {
  const container = require('./PhotosContainer').default
  const reducer = require('./PhotosReducers').default
  injectReducer(store, { key: 'photos', reducer })
  return container
}
