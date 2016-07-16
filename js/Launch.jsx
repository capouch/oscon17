/*
  ** Launch: Modern-era prototypical launch page
    With thanks to the developers of neal-react
    see http://www.nealjs.com/
*/

import React from "react";
import { Link } from "react-router";
import {
  Code,
  CustomerQuote, CustomerQuotes,
  DropdownMenu, DropdownToggle,
  Footer, FooterAddress,
  Hero,
  HorizontalSplit,
  ImageList, ImageListItem,
  Navbar, NavItem,
  Page,
  Section,
  Team,
  TeamMember,
} from "neal-react"

const sampleCode =
`  loadRecordsFromServer: function() {
    let URL = '/oscon-test?query=query+{imageRec(id: "'
      + this.props.record + '"){_id, title, filename, description, source, taglist}}',
      req = new Request(URL, {method: 'POST', cache: 'reload'})
    fetch(req).then(function(response) {
      return response.json()
    }).then (function(json) {
      // console.log('json object: ' + JSON.stringify(json))
      this.setState({record: json.data.imageRec})
    }.bind(this))
`

export default (props) => {
  return (
    <Page>

      <Hero backgroundImage="img/background.png"
        className="text-xs-center">
        <h1 className="display-4">Scene:History </h1>
        <p className="lead">Archiving and Presenting Historical Images</p>
        <p>
          <a href="https://github.com/capouch/oscon16" target="_blank" className="btn btn-white">
            Get it on github
          </a>
        </p>
      </Hero>

      <Section className="nopad-bottom" heading="Sample JavaScript code from project">
        <Code lang="jsx" block>{sampleCode}</Code>
      </Section>

      <Section>
        <HorizontalSplit padding="md">
          <div>
            <p className="lead">Shell executive</p>
            <p>The initial page load brings in a shell program, written in JavaScript, which then manages the client/UI.</p>
          </div>
          <div>
            <p className="lead">Modern Tools</p>
            <p>Code is written ES6 via Babel, React front end, GraphQL queries and mutations, to a local or remote MongoDB backend.
              </p>
          </div>
          <div>
            <p className="lead">Views instead of pages</p>
            <p>React components play nicely with one another, and wrappers exist for many useful tools.</p>
          </div>
        </HorizontalSplit>
      </Section>

      <Section>
        <CustomerQuotes>
          <CustomerQuote name="Danilo Zekovic" imageUrl="img/people/daniloOSCON.jpg">
            <p>The world is changing, and our job is to keep up with it. Developing SPAs is just one small step in that direction</p>
          </CustomerQuote>
          <CustomerQuote name="Brian Capouch" imageUrl="img/people/bcOSCON.jpg">
            <p>The essence of the SPA is that the strictly genericized browser engine will become the standard virtual application container: on the web, on mobile devices, and on the desktop.</p>
          </CustomerQuote>
          <CustomerQuote name="Ben Davisson" imageUrl="img/people/benOSCON.jpg">
            <p>Live your life like a 'while' loop.  Set a goal and accomplish it...or break the system to do so!</p>
          </CustomerQuote>
        </CustomerQuotes>
      </Section>

    </Page>
  )
}
