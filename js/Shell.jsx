/*
  ** Shell: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
*/

import React from "react"
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router"
import { App } from "neal-react"

// Controller and view modules
import Home from "./Launch.js"
import Browse from './Browse'
import Edit from './Edit'
import Zoom from './Zoom'
import Upload from './Upload'
import SlideShow from './SlideShow.js'
// import LoginOut from './Login.js'

// Toplevel CSS
import "../css/main.scss"

// Components rendered on every view
import Header from './Header'
import Footer from './Footer'

// Create toplevel component
class osconSPA extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <App
          history={ browserHistory }>
          { this.props.children }
        </App>
        <Footer/>
      </div>
    )
  }
}

// Render application in main div
ReactDOM.render((
  <Router history = { browserHistory } >
    <Route path = "/" component = { osconSPA } history={ browserHistory } >
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
