import View from './UsersView'
import { connect } from 'react-redux'

import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser
} from './UsersActions'

import {
  updateLogin
} from './LoginActions'

const mapDispatchToProps = {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  updateLogin
}

const mapStateToProps = (state) => {
  return {
    users: state.users.getIn(['users', 'data']),
    user: state.users.getIn(['user', 'data'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
