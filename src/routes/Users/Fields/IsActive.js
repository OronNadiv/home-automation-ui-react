import React, { Component, PropTypes } from 'react'
import { Field } from 'redux-form'
import { Toggle } from './Renders'
import { lightGreen500 } from 'material-ui/styles/colors'

class IsActive extends Component {
  render () {
    const { onToggle } = this.props

    return <Field
      component={Toggle}
      name='is_active'
      notToggledLabel='Inactive'
      onToggleCallback={onToggle}
      toggledLabel='Active'
      toggledColor={lightGreen500}
    />
  }
}

IsActive.propTypes = {
  onToggle: PropTypes.func.isRequired
}

export default IsActive
