import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextField } from './Renders'
import { Field } from 'redux-form'
import { required, validEmail } from './validations'

class Email extends Component {
  render () {
    const { onBlur } = this.props

    return <Field
      component={TextField}
      label='Email'
      name='email'
      onBlurCallback={onBlur}
      type='email'
      validate={[required, validEmail]}
    />
  }
}

Email.propTypes = {
  onBlur: PropTypes.func.isRequired
}

export default Email
