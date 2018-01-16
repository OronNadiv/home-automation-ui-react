import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import { LOGIN_URL } from './config'
import { getToken } from './utils/cookies'
import './styles/main.scss'

const App = require('./containers/AppContainer').default
const store = createStore(window.__INITIAL_STATE__)

const routes = require('./routes/index').default(store)

ReactDOM.render(
  <App
    store={store} routes={routes}
  />,
  document.getElementById('root')
)

const checkToken = () => {
  const token = getToken()
  if (!token) {
    window.location.href = LOGIN_URL
  }
}
setInterval(() => {
  checkToken()
}, 10000)
