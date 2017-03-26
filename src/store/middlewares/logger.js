/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  /* eslint no-console: 0 */

  console.group(action.type)
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

export default logger
