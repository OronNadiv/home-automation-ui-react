import React from 'react'
import {
  Router,
  Route,
  Redirect
} from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import history from '../store/history'

export const createRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route component={CoreLayout} />
        <Redirect from='*' to={'/garage'} />
      </div>
    </Router>
  )
}

export default createRoutes
