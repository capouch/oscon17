/*
  ** Launch: Modern-era prototypical launch page
    With thanks to the developers of neal-react
    see http://www.nealjs.com/
*/

import React from "react"
import { Link } from "react-router-dom"
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

let urlBase = ''
// Send request
const ipc = window.require('electron').ipcRenderer
ipc.send('get-app-path')
// Process update message
// This is an observer pattern
ipc.on('got-app-path', function(app,path) {
  console.log('ipc Path= ' + path)
  urlBase = path + '/' + 'public/'
})

const sampleCode =
` self.addEventListener('fetch', function(event) {
  console.log('Service worker up: ' + event.request.url)
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('Returning cached value for: ' + event.request.url)
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
`

export default (props) => {
  return (
    <Page>
      <Hero backgroundImage= { urlBase + "img/background.png" }
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
          <CustomerQuote name="Danilo Zekovic" imageUrl=  { urlBase + "img/people/daniloOSCON.jpg" } > 
            <p>The world is changing, and our job is to keep up with it. Developing SPAs is just one small step in that direction</p>
          </CustomerQuote>
          <CustomerQuote name="Brian Capouch" imageUrl= {  urlBase + "img/people/bcOSCON.jpg" } >
            <p>The essence of the SPA is that the strictly genericized browser engine will become the standard virtual application container: on the web, on mobile devices, and on the desktop.</p>
          </CustomerQuote>
        </CustomerQuotes>
      </Section>

    </Page>
  )
}
