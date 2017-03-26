import React, { PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

exports.TextField = ({ input, label, meta: { touched, error, dirty, valid }, ...custom }) => {
  const { onBlurCallback } = custom

  return (
    <TextField
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

exports.TextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

exports.SelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => {
  const { disabled, onChangeCallback } = custom

  return (
    <span style={{ textAlign: 'left' }}>
      <SelectField
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

exports.SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

exports.Toggle = ({ input, ...custom }) => {
  const { onToggleCallback, toggledLabel, notToggledLabel, toggledColor } = custom

  return (
    <Toggle
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

exports.Toggle.propTypes = {
  input: PropTypes.object.isRequired
}
