# Home Automation UI using React-Redux
This repository holds the front-end html, css, javascript, images and more.
The front-end uses [React-Redux][react-redux], [Materia-UI][material-ui], and [Sass 3][sass-3].

[![JavaScript Style Guide][standard-image]][standard-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][dependencies-dev-image]][dependencies-dev-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

I suggest you first [read][overview-url] about the different components of the home automation application.  
This will help you understand better the general architecture and different functions of the system.

## Static Deployments
If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router take care of the rest. If you are unsure of how to do this, you might find [this documentation](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server) helpful.  

## Environment variables (configuration)
__NODE\_ENV__ (required): set up the running environment.  Default: `production`.  `production` will enforce encryption using SSL and other security mechanisms.  
__ALARM\_URL__ (required): url to the [alarm system][alarm-url] server.  Default: `//localhost:3002`  
__CAMERA\_URL__ (required): url to the [camera][camera-url] server.  Default: `//localhost:3007`  
__GARAGE\_URL__ (required): url to the [garage][garage-url] server.  Default: `//localhost:3003`  
__LOGIN\_URL__ (required): url to the [authentication][auth-url] server.  Default: `//localhost:3001`  
__PUSH\_URL__ (required): url to the [push][push-url] server.  Default: `//localhost:3005`  
__STORAGE\_URL__ (required): url to the [storage][storage-url] server.  Default: `//localhost:3006`

### License
[AGPL-3.0](https://spdx.org/licenses/AGPL-3.0.html)

### Author
[Oron Nadiv](https://github.com/OronNadiv) ([oron@nadiv.us](mailto:oron@nadiv.us))

[dependencies-image]: https://david-dm.org/OronNadiv/home-automation-ui-react/status.svg
[dependencies-url]: https://david-dm.org/OronNadiv/home-automation-ui-react
[dependencies-dev-image]: https://david-dm.org/OronNadiv/home-automation-ui-react/dev-status.svg
[dependencies-dev-url]: https://david-dm.org/OronNadiv/home-automation-ui-react?type=dev
[travis-image]: http://img.shields.io/travis/OronNadiv/home-automation-ui-react.svg?style=flat-square
[travis-url]: https://travis-ci.org/OronNadiv/home-automation-ui-react
[coveralls-image]: http://img.shields.io/coveralls/OronNadiv/home-automation-ui-react.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/OronNadiv/home-automation-ui-react
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com

[react-redux]: https://facebook.github.io/react/
[material-ui]: http://www.material-ui.com/
[sass-3]: http://sass-lang.com/

[overview-url]: https://oronnadiv.github.io/home-automation
[client-installation-instruction-url]: https://oronnadiv.github.io/home-automation/#installation-instructions-for-the-raspberry-pi-clients
[server-installation-instruction-url]: https://oronnadiv.github.io/home-automation/#installation-instructions-for-the-server-micro-services
[private-public-keys-url]: https://oronnadiv.github.io/home-automation/#generating-private-and-public-keys

[alarm-url]: https://github.com/OronNadiv/alarm-system-api
[auth-url]: https://github.com/OronNadiv/authentication-api
[camera-url]: https://github.com/OronNadiv/camera-api
[garage-url]: https://github.com/OronNadiv/garage-door-api
[notifications-url]: https://github.com/OronNadiv/notifications-api
[push-url]: https://github.com/OronNadiv/push-api
[storage-url]: https://github.com/OronNadiv/storage-api
