/*
  ** Shell: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
*/
import React from 'react'
import { render } from "react-dom"
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
