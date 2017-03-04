/*
  ** Shell: Boot the SPA app into the main div
*/
import React from 'react'
import { render } from "react-dom"
import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router-dom"

import "../css/main.scss"

import rootRoute from './client-routes'
// Render application in main div
render(
  <Router history= { browserHistory } routes = { rootRoute } />,
  document.getElementById('main')
);
