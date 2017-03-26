import React, { Component, PropTypes } from 'react'
import IPropTypes from 'react-immutable-proptypes'
import Drawer from 'material-ui/Drawer'
import { reduxForm } from 'redux-form'
import { Name, Email, IsActive, Role, Password } from './Fields'
import RaisedButton from 'material-ui/RaisedButton'

class UserView extends Component {
  constructor (props) {
    super(props)
    this.createClicked = this.createClicked.bind(this)
  }

  createClicked (values) {
    const { createUser, invalid, onClose } = this.props

    if (invalid) {
      return
    }

    createUser(values)
    onClose()
  }

  componentWillMount () {
    const {
      initialize,
      user
    } = this.props
    user && initialize(user.toJS())
  }

  componentWillReceiveProps (nextProps) {
    const {
      initialize
    } = this.props

    if (nextProps.user && !Object.is(nextProps.user, this.props.user)) {
      initialize(nextProps.user.toJS())
    }
  }

  render () {
    const {
      isNew,
      user,
      updateUser,
      updateLogin,
      onClose,
      submitting,
      invalid,
      handleSubmit
    } = this.props

    return (
      <Drawer
        open
        openSecondary
        containerStyle={{ padding: 10 }}
        docked={false}
        onRequestChange={(open) => {
          !open && onClose()
        }}
      >
        <form onSubmit={handleSubmit(this.createClicked)}>
          <Name
            onBlur={({ value, dirty, valid }) => {
              if (isNew || !dirty || !valid) {
                return
              }
              updateUser(user.get('id'), { name: value })
            }}
          />

          <Email
            onBlur={({ value, dirty, valid }) => {
              if (isNew || !dirty || !valid) {
                return
              }
              // TODO: email update does not work.
              updateUser(user.get('id'), { email: value })
            }}
          />

          <Password
            onBlur={({ value, dirty, valid }) => {
              if (isNew || !dirty || !valid) {
                return
              }
              updateLogin(user.get('login_id'), { password: value })
            }}
          />

          <Role
            onChange={(role) => {
              if (isNew) {
                return
              }
              updateUser(user.get('id'), { role })
            }}
            user={user}
          />

          <IsActive
            onToggle={(isActive) => {
              if (isNew) {
                return
              }
              // deactivating user turns the user into role:regular
              updateUser(user.get('id'), { is_active: isActive })
            }}
          />

          {
            user.get('id') === 0 &&
            <RaisedButton
              primary
              type='submit'
              disabled={submitting || invalid}
              label='Create User'
              fullWidth
            />
          }
        </form>
      </Drawer>
    )
  }
}

UserView.propTypes = {
  isNew: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: IPropTypes.map.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateLogin: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'user'
})(UserView)
