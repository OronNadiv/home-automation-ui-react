import React from 'react'
import PropTypes from 'prop-types'

const MUISelectField = require('material-ui/SelectField').default
const MUITextField = require('material-ui/TextField').default
const MUIToggle = require('material-ui/Toggle').default

export const TextField = ({ input, label, meta: { touched, error, dirty, valid }, ...custom }) => {
  const { onBlurCallback } = custom

  return (
    <MUITextField
      style={{
        marginBottom: 30,
        width: 200
      }}
      floatingLabelFixed
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onBlur={() => {
        input.onBlur()
        onBlurCallback({ value: input.value, dirty, valid })
      }}
    />
  )
}

TextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export const SelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => {
  const { disabled, onChangeCallback } = custom

  return (
    <span style={{ textAlign: 'left' }}>
      <MUISelectField
        style={{
          marginBottom: 30,
          width: 200
        }}
        floatingLabelFixed
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => {
          input.onChange(value)
          onChangeCallback(value)
        }}
        children={children}
        disabled={disabled}
      />
    </span>
  )
}

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export const Toggle = ({ input, ...custom }) => {
  const { onToggleCallback, toggledLabel, notToggledLabel, toggledColor } = custom

  return (
    <MUIToggle
      style={{
        marginBottom: 30,
        width: 200
      }}
      {...input}
      label={input.value ? toggledLabel : notToggledLabel}
      toggled={!!input.value}
      thumbSwitchedStyle={{ backgroundColor: toggledColor }}
      trackSwitchedStyle={{ backgroundColor: toggledColor }}
      onToggle={(e, isToggled) => {
        input.onChange(isToggled)
        onToggleCallback(isToggled)
      }}
    />
  )
}

Toggle.propTypes = {
  input: PropTypes.object.isRequired
}
