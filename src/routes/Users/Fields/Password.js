import React, { Component, PropTypes } from 'react'
import { Field } from 'redux-form'
import { required } from './validations'
import { TextField } from './Renders'

class Password extends Component {
  render () {
    const { onBlur } = this.props

    return <Field
      component={TextField}
      label='Password'
      name='password'
      onBlurCallback={onBlur}
      validate={[required]}
    />
  }
}

Password.propTypes = {
  onBlur: PropTypes.func.isRequired
}

export default Password
