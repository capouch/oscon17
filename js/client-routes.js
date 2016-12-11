// client-routes.js: Module which code-splits per view
// Inspiration taken from:
// http://moduscreate.com/code-splitting-for-react-router-with-es6-imports/
// and its associated (but non-running) repo:
// https://github.com/ModusCreateOrg/react-dynamic-route-loading-es6

// Toplevel component
import SPA from "./App"

// Complain on error
function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

// Async: Pull in code for this route
function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

// Set up client-side routes
export default {
  component: SPA,

  childRoutes: [
      {
        path: '/',
        getComponent(location, cb) {
          System.import('./Launch')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      {
        path: 'home',
        getComponent(location, cb) {
          System.import('./Launch')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      {
        path: 'browse',
        getComponent(location, cb) {
          System.import('./Browse')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      {
        path: 'asset',
        getComponent(location, cb) {
          System.import('./Asset')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      {
        path: 'edit/:imageId',
        getComponent(location, cb) {
          System.import('./Edit')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      {
        path: 'slides',
        getComponent(location, cb) {
          System.import('./SlideShow')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      {
        path: 'slides/:viewSet',
        getComponent(location, cb) {
          System.import('./SlideShow')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      {
        path: 'zoomer/:imageId',
        getComponent(location, cb) {
          System.import('./Zoom')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      {
        path: 'upload',
        getComponent(location, cb) {
          System.import('./Upload')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
    ]
  }
