/*
  ** Shell: Boot the SPA app into the main div
*/

import React from '../public/libs/react'
import { render } from "../public/libs/react-dom-fiber"

import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router/es"

import "../css/main.scss"

import rootRoute from './client-routes'
// Render application in main div
render(
  <Router history= { browserHistory } routes = { rootRoute } />,
  document.getElementById('main')
);
