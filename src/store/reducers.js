import { combineReducers } from 'redux'
import locationReducer from './location'
import meReducer from './meReducer'
import { reducer as reduxFormReducer } from 'redux-form'
import garage from '../routes/Garage/GarageReducers'
import alarm from '../routes/Alarm/AlarmReducers'
import photos from '../routes/Photos/PhotosReducers'
import users from '../routes/Users/UsersReducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    me: meReducer,
    location: locationReducer,
    form: reduxFormReducer,
    garage,
    alarm,
    photos,
    users,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
