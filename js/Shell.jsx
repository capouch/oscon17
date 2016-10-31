/*
  ** Shell: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
*/
import React from 'react'
import { render } from "react-dom";
import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router/es"

// Main component and styling
// import SPA from './App.js'
import "../css/main.scss"

import rootRoute from './client-routes'
// Render application in main div
render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('main')
);

/*

// Controller and view modules
import Home from "./Launch.jsx"
import Browse from './Browse'
import Edit from './Edit'
import Zoom from './Zoom'
import Upload from './Upload'
import SlideShow from './SlideShow.js'


render((
  <Router history = { browserHistory } >
    <Route path = "/" component = { SPA } history={ browserHistory } >
      <IndexRoute name ="home" component = { Home } />
      <Route path = "browse" component = { Browse } />
      <Route path = "edit/:imageId" component = { Edit } />
      <Route path = "zoomer" component = { Zoom } />
      <Route path = "zoomer/:imageId" component = { Zoom }/>
      <Route path = "upload" component = { Upload } />
      <Route path = "slides" component = { SlideShow } />
      <Route path = "slides/:viewSet" component = { SlideShow } />
      <Route path = "*" component = { Home } />
    </Route>
  </Router>
), document.getElementById("main"))
*/
