import React from 'react'
import { browserHistory, Router, Route, Redirect } from 'react-router'
import CoreLayout from '../layouts/CoreLayout'
import GarageRoute from './Garage'
import AlarmRoute from './Alarm'
import PhotosRoute from './Photos'
import UsersRoute from './Users'

export const createRoutes = (store) => {
  return (
    <Router history={browserHistory}>
      <Route component={CoreLayout}>
        <Route
          path={'/garage'}
          component={GarageRoute(store)}
        />
        <Route
          path={'/alarm'}
          component={AlarmRoute(store)}
        />
        <Route
          path={'/photos'}
          component={PhotosRoute(store)}
        />
        <Route
          path={'/users'}
          component={UsersRoute(store)}
        />
      </Route>
      <Redirect
        from='*'
        to={'/garage'}
      />
    </Router>
  )
}

export default createRoutes
