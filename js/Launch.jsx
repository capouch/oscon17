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
    let URL = '/oscon-test?query=query+{imageRec(id: "' + this.props.record + '"){_id, title, filename, description, source, taglist}}',
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
        <h1 className="display-4">Independence Church and Cemetery</h1>
        <p className="lead">Jasper County&#39;s Oldest Church</p>
        <p>
          <a href="http://www.independence-church.org" target="_blank" className="btn btn-white">
            How can I help?
          </a>
        </p>
      </Hero>

      <Section>
        <HorizontalSplit padding="md">
          <div>
            <p className="lead">Founded in the 1840s</p>
            <p>Independence Church was founded by Jasper County&#39;s earliest families: The Gillams, Culps, and Randles</p>
          </div>
          <div>
            <p className="lead">Church, Cemetery, School</p>
            <p>Besides the church, which was built in 1872 and remodeled in 1949, there is a large cemetery, and across the road, the remains of Independence School.
              </p>
          </div>
          <div>
            <p className="lead">National Register</p>
            <p>The church was listed on the National Register of Historic Places in 1976</p>
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
