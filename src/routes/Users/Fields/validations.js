import isEmail from 'sane-email-validation'

export const required = value => {
  return !value && 'Required'
}

export const validEmail = value => {
  return !isEmail(value) && 'Invalid Email'
}
