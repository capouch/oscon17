/*
  ** Shell: The App runs the shell, i.e. client-side controller
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
  <Router history={ browserHistory } routes={ rootRoute } />,
  document.getElementById('main')
);
