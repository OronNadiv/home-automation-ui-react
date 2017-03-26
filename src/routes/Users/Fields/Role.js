import React, { Component, PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Field } from 'redux-form'
import { SelectField } from './Renders'
import { required } from './validations'
import IPropTypes from 'react-immutable-proptypes'

class Role extends Component {
  render () {
    const { onChange, user } = this.props

    return <Field
      component={(values) => SelectField(values)}
      disabled={user.get('role') === 'owner'}
      label='Role'
      name='role'
      onChangeCallback={onChange}
      validate={[required]}
    >
      <MenuItem
        value={'regular'}
        primaryText='Regular'
      />
      <MenuItem
        value={'trusted'}
        primaryText='Trusted'
      />
      <MenuItem
        value={'admin'}
        primaryText='Administrator'
      />
      <MenuItem
        style={{ display: 'none' }}
        value={'owner'}
        primaryText='Owner'
      />
    </Field>
  }
}

Role.propTypes = {
  onChange: PropTypes.func.isRequired,
  user: IPropTypes.map.isRequired
}

export default Role
