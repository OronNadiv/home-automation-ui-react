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
    this.setState({
      selectedIndex: index,
      title: this.titles[index]
    })
    const router = require('react-router')
    router.browserHistory.push(this.urls[index])
  }

  componentWillMount () {
    const {
      fetchMe
    } = this.props

    fetchMe()
  }

  render () {
    const { children, me } = this.props

    const selectedIndex = this.urls.findIndex(url => window.location.pathname.startsWith(url))
    return (
      <div>
        <div
          style={{
            padding: '20px 0 56px 0',
            textAlign: 'center'
          }}>
          {children}
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
                <span style={{ color: selectedIndex === 0 ? white : GRAY }}>
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
                <span style={{ color: selectedIndex === 1 ? white : GRAY }}>
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
              style={{ display: me && me.get('is_trusted') ? 'initial' : 'none' }}
              label={
                <span style={{ color: selectedIndex === 2 ? white : GRAY }}>
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
                <span style={{ color: selectedIndex === 3 ? white : GRAY }}>
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
  children: PropTypes.element.isRequired,
  fetchMe: PropTypes.func.isRequired
}

export default CoreLayout
