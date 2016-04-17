import React from "react";
import SamplePage from "./Shell.jsx";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router";
import { App } from "neal-react";
import Browser from './Browser'
import Zoomer from './Zoomer'
import Uploader from './Uploader'

class SampleApp extends React.Component {
  render() {
    return (
      <App
        googleAnalyticsKey="UA-42490151-3"
        segmentKey="Pd3LXILLoxlOKXi9zWTCyhK2MRvygFhF"
        stripeKey="pk_BkaOyHcEiCFaUiEADe7UH6Wq7D6f7"
        history={ browserHistory }>
        { this.props.children }
      </App>
    );
  }
}

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ SampleApp } history={ browserHistory }>
      <IndexRoute name="home" component={ SamplePage }/>
      <Route path="browse" component= { Browser }/>
      <Route path="zoomer" component={ Zoomer }/>
      <Route path="upload" component={ Uploader }/>
      <Route path="*" component={ SamplePage }/>
    </Route>
  </Router>
), document.getElementById("main"));
