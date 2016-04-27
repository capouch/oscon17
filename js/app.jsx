import React from "react";
import Shell from "./Shell.jsx";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router";
import { App } from "neal-react";
import Browse from './Browse'
import Zoom from './Zoom'
import Upload from './Upload2'
import ImageShow from './ImageShow.js'

import Header from './Header'
import PageFooter from './Footer'

class SampleApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <App
          googleAnalyticsKey="UA-42490151-3"
          segmentKey="Pd3LXILLoxlOKXi9zWTCyhK2MRvygFhF"
          stripeKey="pk_BkaOyHcEiCFaUiEADe7UH6Wq7D6f7"
          history={ browserHistory }>
          { this.props.children }
        </App>
        <PageFooter/>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ SampleApp } history={ browserHistory }>
      <IndexRoute name="home" component={ Shell }/>
      <Route path="browse" component= { Browse }/>
      <Route path="zoomer" component= { Zoom }/>
      <Route path="zoomer/:imageId" component={ Zoom }/>
      <Route path="upload" component={ Upload }/>
      <Route path="images" component={ ImageShow } />
      <Route path="*" component={ Shell }/>
    </Route>
  </Router>
), document.getElementById("main"));
