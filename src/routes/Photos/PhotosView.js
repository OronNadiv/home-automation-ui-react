import React, { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui/List'
import PhotoIcon from 'material-ui/svg-icons/image/photo'
import RaisedButton from 'material-ui/RaisedButton'
import IPropTypes from 'react-immutable-proptypes'
import moment from 'moment'
import Snackbar from 'material-ui/Snackbar'
import Drawer from 'material-ui/Drawer'
import { PhotoSwipe } from 'react-photoswipe'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { black, lightGreenA400 as successColor, redA400 as failColor } from 'material-ui/styles/colors'

class PhotosView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requestSent: false,
      isSliderOpen: false,
      isDrawerOpen: false,
      index: 0
    }
  }

  componentWillMount () {
    const {
      fetchPhotos
    } = this.props

    fetchPhotos()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.requestTimestamp !== nextProps.requestTimestamp) {
      this.setState({ requestSent: true })
    }
  }

  getItems () {
    const { photos } = this.props

    return (
      <List style={{ textAlign: 'left' }}>
        {
          photos.map((photo, index) => {
            return (
              <ListItem
                key={index}
                leftIcon={
                  <PhotoIcon
                    color={black}
                  />
                }
                primaryText={photo.get('localTimeFormatted')}
                onClick={() => {
                  this.setState({
                    isSliderOpen: true,
                    index
                  })
                }}
              />
            )
          })
        }
      </List>
    )
  }

  render () {
    const { takePhoto, photos } = this.props
    const { isSliderOpen, index } = this.state

    return (
      <div>
        <RaisedButton
          primary
          label={'Take Photo'}
          onClick={() => {
            this.setState({ isDrawerOpen: true })
          }}
          labelStyle={{ fontSize: 22 }}
          style={{ height: 75, width: 200 }}
        />
        {this.getItems()}
        <Snackbar
          contentStyle={{
            color: this.props.requestIsSuccess
              ? successColor
              : failColor
          }}
          open={this.state.requestSent}
          message={
            this.props.requestIsSuccess
              ? 'Request sent successfully'
              : 'Request failed'
          }
          autoHideDuration={2000}
          onRequestClose={() => this.setState({ requestSent: false })}
        />
        <PhotoSwipe
          isOpen={isSliderOpen}
          items={photos.toJS()}
          options={{
            history: false,
            galleryPIDs: false,
            index
          }}
          onClose={() => {
            this.setState({ isSliderOpen: false })
          }}
        />
        <Drawer
          disableSwipeToOpen
          docked={false}
          open={this.state.isDrawerOpen}
          openSecondary
          onRequestChange={(isDrawerOpen) => {
            this.setState({ isDrawerOpen })
          }}
        >
          <List style={{ textAlign: 'left' }}>
            <ListItem
              key={1}
              primaryText={'Once'}
              onClick={() => {
                takePhoto({ count: 1 })
                this.setState({ isDrawerOpen: false })
              }}
            />
            <ListItem
              key={2}
              primaryText={'For 1 Minute'}
              onClick={() => {
                takePhoto({ duration: moment.duration(1, 'minutes').toISOString() })
                this.setState({ isDrawerOpen: false })
              }}
            />
            <ListItem
              key={3}
              primaryText={'For 5 Minutes'}
              onClick={() => {
                takePhoto({ duration: moment.duration(5, 'minutes').toISOString() })
                this.setState({ isDrawerOpen: false })
              }}
            />
            <ListItem
              key={4}
              primaryText={'For 10 Minutes'}
              onClick={() => {
                takePhoto({ duration: moment.duration(10, 'minutes').toISOString() })
                this.setState({ isDrawerOpen: false })
              }}
            />
            <ListItem
              key={5}
              primaryText={'For 15 Minutes'}
              onClick={() => {
                takePhoto({ duration: moment.duration(15, 'minutes').toISOString() })
                this.setState({ isDrawerOpen: false })
              }}
            />
            <ListItem
              key={6}
              primaryText={'For 30 Minutes'}
              onClick={() => {
                takePhoto({ duration: moment.duration(30, 'minutes').toISOString() })
                this.setState({ isDrawerOpen: false })
              }}
            />
          </List>
        </Drawer>
      </div>
    )
  }
}

PhotosView.propTypes = {
  fetchPhotos: PropTypes.func.isRequired,
  requestTimestamp: PropTypes.number.isRequired,
  requestIsSuccess: PropTypes.bool.isRequired,
  photos: IPropTypes.list.isRequired,
  takePhoto: PropTypes.func.isRequired
}

export default PhotosView
