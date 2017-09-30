import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'material-ui/Tabs'
import { List, ListItem } from 'material-ui/List'
import IPropTypes from 'react-immutable-proptypes'
import {
  red500 as armedColor,
  redA400 as failColor,
  black
} from 'material-ui/styles/colors'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import Snackbar from 'material-ui/Snackbar'
import Toggle from 'material-ui/Toggle'
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active'
import NotificationsOffIcon from 'material-ui/svg-icons/social/notifications-off'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'

class AlarmView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requestSent: false
    }
  }

  componentWillMount () {
    const {
      fetchMe,
      fetchAcks,
      fetchMotions,
      fetchToggles
    } = this.props

    fetchMe()
    fetchAcks()
    fetchMotions()
    fetchToggles()
  }

  componentWillReceiveProps (nextProps) {
    const {
      fetchAcks,
      fetchMotions,
      fetchToggles
    } = this.props

    if (this.props.requestTimestamp !== nextProps.requestTimestamp) {
      this.setState({ requestSent: true })
    }

    if (this.props.lastAuthenticated !== nextProps.lastAuthenticated) {
      fetchAcks()
      fetchMotions()
      fetchToggles()
    }
  }

  getAcks () {
    const { acks } = this.props
    return (
      <List style={{ textAlign: 'left' }}>
        {
          acks.map((ack, index) => {
            return <ListItem
              key={index}
              leftIcon={
                ack.get('mayBeFaulty')
                  ? (
                    <WarningIcon
                      color={black}
                    />
                  )
                  : (
                    <CheckIcon
                      color={black}
                    />
                  )}
              primaryText={ack.get('sensor_name')}
              secondaryText={ack.get('localTimeFormatted')}
            />
          })
        }
      </List>
    )
  }

  getMotions () {
    const { motions } = this.props
    return (
      <List style={{ textAlign: 'left' }}>
        {
          motions.map((motion, index) => {
            return <ListItem
              key={index}
              leftIcon={
                <NotificationsActiveIcon
                  color={black}
                />
              }
              primaryText={motion.get('sensor_name')}
              secondaryText={motion.get('localTimeFormatted')}
            />
          })
        }
      </List>
    )
  }

  getToggles () {
    const { toggles } = this.props
    return (
      <List style={{ textAlign: 'left' }}>
        {
          toggles.map((toggle, index) => {
            return <ListItem
              key={index}
              leftIcon={toggle.get('is_armed')
                ? (
                  <NotificationsIcon
                    color={black}
                  />
                )
                : (
                  <NotificationsOffIcon
                    color={black}
                  />
                )}
              primaryText={toggle.getIn(['requestedBy', 'name'])}
              secondaryText={toggle.get('localTimeFormatted')}
            />
          })
        }
      </List>
    )
  }

  render () {
    const { me, isArmed, changeAlarmState } = this.props

    return (
      <div>
        <Toggle
          style={{
            maxWidth: 150,
            margin: '20px auto'
          }}
          label={isArmed ? 'Armed' : 'Not Armed'}
          toggled={isArmed}
          thumbSwitchedStyle={{ backgroundColor: armedColor }}
          trackSwitchedStyle={{ backgroundColor: armedColor }}
          labelStyle={{ color: isArmed && armedColor }}
          onToggle={(e, isArmed) => {
            this.setState({ isArmed })
            changeAlarmState(isArmed)
          }}
        />
        {
          me.get('is_trusted') &&
          <Tabs>
            <Tab label='Toggles'>
              {this.getToggles()}
            </Tab>
            <Tab label='Acks'>
              {this.getAcks()}
            </Tab>
            <Tab label='Motions'>
              {this.getMotions()}
            </Tab>
          </Tabs>
        }
        {
          this.state.requestSent && !this.props.requestIsSuccess &&
          <Snackbar
            contentStyle={{ color: failColor }}
            open={this.state.requestSent}
            message='Request failed'
            autoHideDuration={2000}
            onRequestClose={() => this.setState({ requestSent: false })}
          />
        }
      </div>
    )
  }
}

AlarmView.propTypes = {
  me: IPropTypes.map.isRequired,
  lastAuthenticated: PropTypes.number.isRequired,

  acks: IPropTypes.list.isRequired,
  motions: IPropTypes.list.isRequired,
  toggles: IPropTypes.list.isRequired,

  fetchMe: PropTypes.func.isRequired,
  fetchAcks: PropTypes.func.isRequired,
  fetchMotions: PropTypes.func.isRequired,
  fetchToggles: PropTypes.func.isRequired,

  requestTimestamp: PropTypes.number.isRequired,
  requestIsSuccess: PropTypes.bool.isRequired,
  changeAlarmState: PropTypes.func.isRequired,
  isArmed: PropTypes.bool.isRequired
}

export default AlarmView
