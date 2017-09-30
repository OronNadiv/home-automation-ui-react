import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { required } from './validations'
import { TextField } from './Renders'

class Name extends Component {
  render () {
    const { onBlur } = this.props

    return <Field
      component={TextField}
      label='Name'
      name='name'
      onBlurCallback={onBlur}
      validate={[required]}
    />
  }
}

Name.propTypes = {
  onBlur: PropTypes.func.isRequired
}

export default Name
