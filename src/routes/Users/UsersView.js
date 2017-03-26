import React, { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui/List'
import PersonIcon from 'material-ui/svg-icons/social/person'
import PersonOutlineIcon from 'material-ui/svg-icons/social/person-outline'
import IPropTypes from 'react-immutable-proptypes'
import s from 'underscore.string'
import RaisedButton from 'material-ui/RaisedButton'
import UserView from './UserView'
import { black } from 'material-ui/styles/colors'

class UsersView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDrawer: false
    }
  }

  componentWillMount () {
    const {
      fetchUsers
    } = this.props

    fetchUsers()
  }

  render () {
    const {
      fetchUser,
      createUser,
      updateUser,
      updateLogin,
      user,
      users
    } = this.props

    return (
      <div>
        <RaisedButton
          label={'Create User'}
          onClick={() => {
            fetchUser()
            this.setState({
              isNew: true,
              showDrawer: true
            })
          }}
          primary
          labelStyle={{ fontSize: 22 }}
          style={{ height: 75, width: 200 }}
        />

        <List style={{ textAlign: 'left' }}>
          {
            users.map((user, index) => {
              return <ListItem
                key={index}
                onClick={() => {
                  fetchUser(user.get('id'))
                  this.setState({
                    isNew: false,
                    showDrawer: true
                  })
                }}
                leftIcon={
                  user.get('is_active')
                    ? (
                      <PersonIcon
                        color={black}
                      />
                    )
                    : (
                      <PersonOutlineIcon
                        color={black}
                      />
                    )}
                primaryText={user.get('name')}
                secondaryText={s.titleize(user.get('role_pretty'))}
              />
            })
          }
        </List>
        {
          this.state.showDrawer &&
          <UserView
            isNew={this.state.isNew}
            onClose={() => this.setState({
              isNew: null,
              showDrawer: false
            })}
            updateUser={updateUser}
            updateLogin={updateLogin}
            createUser={createUser}
            user={user}
          />
        }
      </div>
    )
  }
}

UsersView.propTypes = {
  updateUser: PropTypes.func.isRequired,
  updateLogin: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  user: IPropTypes.map.isRequired,
  users: IPropTypes.list.isRequired
}

export default UsersView
