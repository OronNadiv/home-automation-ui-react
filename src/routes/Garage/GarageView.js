import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import IPropTypes from 'react-immutable-proptypes'
import Snackbar from 'material-ui/Snackbar'
import {
  red500 as openedColor,
  lightGreen500 as closedColor,
  lightGreenA400 as successColor,
  redA400 as failColor
} from 'material-ui/styles/colors'

class GarageView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requestSent: false
    }
  }

  componentWillMount () {
    const {
      fetchMe,
      fetchStates
    } = this.props

    fetchMe()
    fetchStates()
  }

  componentWillReceiveProps (nextProps) {
    const {
      fetchStates
    } = this.props

    if (this.props.requestTimestamp !== nextProps.requestTimestamp) {
      this.setState({ requestSent: true })
    }

    if (this.props.lastAuthenticated !== nextProps.lastAuthenticated) {
      fetchStates()
    }
  }

  getItems () {
    const { states, me } = this.props
    if (!me.get('is_trusted')) {
      return ''
    }
    return (
      <List style={{ textAlign: 'left' }}>
        {
          states.map((state, index) => {
            return <ListItem
              key={index}
              leftIcon={state.get('is_open')
                ? (
                  <img
                    alt=''
                    src={`${process.env.PUBLIC_URL}/garage-open.png`}
                  />
                )
                : (
                  <img
                    alt=''
                    src={`${process.env.PUBLIC_URL}/garage-close.png`}
                  />
                )
              }
              primaryText={state.getIn(['requestedBy', 'name']) || 'Unknown'}
              secondaryText={state.get('localTimeFormatted')}
            />
          })
        }
      </List>
    )
  }

  render () {
    const { states, changeDoorState, me } = this.props
    const isOpen = states && states.size && states.getIn([0, 'is_open'])
    return (
      <div>
        <RaisedButton
          backgroundColor={isOpen ? openedColor : closedColor}
          label={isOpen ? 'close' : 'open'}
          onClick={() => changeDoorState()}
          labelStyle={{ fontSize: 22 }}
          style={{ height: 75, width: 200 }}
        />
        {me.get('is_trusted') && this.getItems()}
        <Snackbar
          contentStyle={{
            color: this.props.requestIsSuccess
              ? successColor
              : failColor
          }}
          open={this.state.requestSent}
          message={
            this.props.requestIsSuccess
              ? 'Request sent successfully'
              : 'Request failed'
          }
          autoHideDuration={2000}
          onRequestClose={() => this.setState({ requestSent: false })}
        />
      </div>
    )
  }
}

GarageView.propTypes = {
  me: IPropTypes.map.isRequired,
  lastAuthenticated: PropTypes.number.isRequired,
  states: IPropTypes.list.isRequired,
  requestTimestamp: PropTypes.number.isRequired,
  requestIsSuccess: PropTypes.bool.isRequired,
  changeDoorState: PropTypes.func.isRequired,
  fetchStates: PropTypes.func.isRequired,
  fetchMe: PropTypes.func.isRequired
}

export default GarageView
