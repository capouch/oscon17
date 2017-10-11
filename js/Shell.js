/*
  ** Shell: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
*/

import React from "react"
import ReactDOM from "react-dom"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

// Controller and view modules
import Home from "./Launch"
import Browse from './Browse'
import Edit from './Edit'
import Asset from './Asset'
import Zoom from './Zoom'
import Upload from './Upload'
import SlideShow from './SlideShow'
import Subscribe from './Subscribe'
import Announce from './Announce'
// import LoginOut from './Login.js'

// Toplevel CSS
import "../css/main.scss"

// Components rendered on every view
import Header from './Header'
import Footer from './Footer'

// Maybe some notifications for OSCON17?
import webPush from 'web-push'

// Render application in main div - upgraded for react-route v4
ReactDOM.render((
  <Router>
    <div>
      <Route component = { Header } />
      <Switch>
        <Route exact path = '/' component = { Home } />
        <Route exact path = '/index.html' component = { Home } />
        <Route path = "/home" component = { Home } />
        <Route path = "/browse" component = { Browse } />
        <Route path = "/edit/:imageId" component = { Edit } />
        <Route path = "/asset/:imageId" component = { Asset } />
        <Route path = "/zoomer/:imageId" component = { Zoom } />
        <Route path = "/upload" component = { Upload } />
        <Route exact path = "/slides" component = { SlideShow } />
        <Route path = "/slides/:viewSet" component = { SlideShow } />
        <Route path = "/subscribe" component = { Subscribe } />
        <Route path = "/announce/:topic" component = { Announce } />
      </Switch>
      <Route component = { Footer } />
    </div>
  </Router>
), document.getElementById("main"))
