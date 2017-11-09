import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active'
import PhotosIcon from 'material-ui/svg-icons/image/photo-camera'
import UsersIcon from 'material-ui/svg-icons/social/group'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IPropTypes from 'react-immutable-proptypes'
import { white } from 'material-ui/styles/colors'
import { Route } from 'react-router-dom'
import GarageContainer from '../../routes/Garage/GarageContainer'
import AlarmContainer from '../../routes/Alarm/AlarmContainer'
import PhotosContainer from '../../routes/Photos/PhotosContainer'
import UsersContainer from '../../routes/Users/UsersContainer'
import { withRouter } from 'react-router'

const GRAY = 'rgba(255, 255, 255, 0.701961)'

class CoreLayout extends Component {
  constructor (props) {
    super(props)

    this.titles = [
      'Garage',
      'Alarm',
      'Photos',
      'Users'
    ]
    this.urls = [
      '/garage',
      '/alarm',
      '/photos',
      '/users'
    ]
    const selectedIndex = this.urls.findIndex(url => window.location.pathname.startsWith(url)) || 0
    this.state = {
      selectedIndex,
      title: this.titles[selectedIndex]
    }
  }

  select (index) {
    const {history} = this.props
    this.setState({
      selectedIndex: index,
      title: this.titles[index]
    })
    history.push(this.urls[index])
  }

  componentWillMount () {
    const {
      fetchMe
    } = this.props

    fetchMe()
  }

  render () {
    const {me} = this.props

    const selectedIndex = this.urls.findIndex(url => window.location.pathname.startsWith(url))
    return (
      <div>
        <div
          style={{
            padding: '20px 0 56px 0',
            textAlign: 'center'
          }}>
          <Route
            path={'/garage'}
            component={GarageContainer}
          />
          <Route
            path={'/alarm'}
            component={AlarmContainer}
          />
          <Route
            path={'/photos'}
            component={PhotosContainer}
          />
          <Route
            path={'/users'}
            component={UsersContainer}
          />
        </div>
        <Paper
          zDepth={1}
          style={{
            zIndex: 1,
            height: 56,
            position: 'fixed',
            bottom: 0,
            width: '100%'
          }}
        >
          <BottomNavigation
            selectedIndex={selectedIndex}
          >
            <BottomNavigationItem
              label={
                <span style={{color: selectedIndex === 0 ? white : GRAY}}>
                  Garage
                </span>
              }
              icon={
                <CarIcon
                  color={selectedIndex === 0 ? white : GRAY}
                />
              }
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label={
                <span style={{color: selectedIndex === 1 ? white : GRAY}}>
                  Alarm
                </span>
              }
              icon={
                <NotificationsActiveIcon
                  color={selectedIndex === 1 ? white : GRAY}
                />
              }
              onClick={() => this.select(1)}
            />

            <BottomNavigationItem
              style={{display: me && me.get('is_trusted') ? 'initial' : 'none'}}
              label={
                <span style={{color: selectedIndex === 2 ? white : GRAY}}>
                  Photos
                </span>
              }
              icon={
                <PhotosIcon
                  color={selectedIndex === 2 ? white : GRAY}
                />
              }
              onClick={() => this.select(2)}
            />

            <BottomNavigationItem
              style={{
                display: me && me.get('is_admin') ? 'initial' : 'none'
              }}
              label={
                <span style={{color: selectedIndex === 3 ? white : GRAY}}>
                  Users
                </span>
              }
              icon={
                <UsersIcon
                  color={selectedIndex === 3 ? white : GRAY}
                />
              }
              onClick={() => this.select(3)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  me: IPropTypes.map.isRequired,
  fetchMe: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(CoreLayout)
