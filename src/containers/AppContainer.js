import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { lightBlue500, white } from 'material-ui/styles/colors'

injectTapEventPlugin()

const muiTheme = getMuiTheme(
  {
    bottomNavigation: {
      backgroundColor: lightBlue500
    },
    palette: {
      primary1Color: lightBlue500
    },
    raisedButton: {
      textColor: white
    }
  }
)

class AppContainer extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={{ height: '100%' }}>
            <BrowserRouter
              children={routes}
            />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppContainer
