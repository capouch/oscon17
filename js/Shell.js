/*
  ** Shell: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
*/

/* Safekeeping
<Route path = "*" component = { Home } />
*/

import React from "react"
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom/es"
import createHistory from "history/createBrowserHistory"
import { App } from "neal-react"

// Controller and view modules
import Home from "./Launch"
import Browse from './Browse'
import Edit from './Edit'
import Asset from './Asset'
import Zoom from './Zoom'
import Upload from './Upload'
import SlideShow from './SlideShow'
// import LoginOut from './Login.js'

// Toplevel CSS
import "../css/main.scss"

// Components rendered on every view
import Header from './Header'
import Footer from './Footer'

// History object is no longer kept in react-router?? 2/26
const BrowserHistory = createHistory()

// Create toplevel component
class osconSPA extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <App
          history={ BrowserHistory }>
          { this.props.children }
        </App>
        <Footer/>
      </div>
    )
  }
}

// Render application in main div
ReactDOM.render((
  <Router history = { BrowserHistory } >
    <div>
    <Route exact path = "/" component = { osconSPA } history={ BrowserHistory } />
      <Route path = "/home" component = { Home } />
      <Route path = "/browse" component = { Browse } />
      <Route path = "/edit/:imageId" component = { Edit } />
      <Route path = "/zoomer/:imageId" component = { Zoom } />
      <Route path = "/asset/:imageId" component = { Asset } />
      <Route path = "/upload" component = { Upload } />
      <Route exact path = "/slides" component = { SlideShow } />
      <Route path = "/slides/:viewSet" component = { SlideShow } />
      </div>
  </Router>
), document.getElementById("main"))
