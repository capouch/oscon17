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

      <Hero backgroundImage="img/background.png"
        className="text-xs-center">
        <h1 className="display-4">White County Historical Society </h1>
        <p className="lead">Collect, Preserve, Protect the History of White County</p>
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
          <CustomerQuote name="Col. Isaac White" imageUrl="img/people/white.jpg">
            <p>White County is named after Colonel Isaac White</p>
          </CustomerQuote>
          <CustomerQuote name="Research" imageUrl="img/people/research.jpg">
            <p>The WCHS does more than house its history.  Our members participate in current projects and related issues.</p>
          </CustomerQuote>
          <CustomerQuote name="North Star Book" imageUrl="img/people/northStar.jpg">
            <p>A true story from the individual journals of Dr. Henry W. Greist, his wife Mollie, who is a trained surgical nurse, and their young son David to tell of the remarkable experiences of this family during the 1920s and 30s at the furthest point north in Alaska.</p>
          </CustomerQuote>
        </CustomerQuotes>
      </Section>

    </Page>
  )
}
