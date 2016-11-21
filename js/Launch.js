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

const html =
`
<p>
Mission Statement: To appreciate and encourage the connection of the past to
the future by collecting and preserving the history of White County, Indiana.
<p>
White County Historical Society is a not-for-profit Society established to bring
together those who share a common interest in White County Indiana's history.
The Society has a Museum that has many displays recently reworked for public
viewing and a variety of programs for our community.  Our new remodel building
interior provides the public an opportunity to research and to share their
research with others.  The current WC Genealogy Society is housed on the main
floor.  Between the two societies there are many historical files available for
your research needs.  We also have research services available.
`

export default (props) => {
  return (
    <Page>

      <Hero backgroundImage="img/background.jpg"
        className="text-xs-center">
        <h1 className="display-4">White County Indiana Historical Society </h1>
        <p className="lead">Collect, Preserve, Protect the History of White County</p>
      </Hero>

      <Section className="nopad-bottom" heading="About the society">
        <div dangerouslySetInnerHTML={ {__html: html} } />
      </Section>

      <Section>
        <HorizontalSplit padding="md">
          <div>
            <p className="lead">&#8226; Maintaining historical source material</p>
            <p>The society operates a museum featuring many colllections</p>
          </div>
          <div>
            <p className="lead">&#8226; Providing research facilities</p>
            <p>Our reading room contains many historical reference works.
              </p>
          </div>
          <div>
            <p className="lead">&#8226; Publications</p>
            <p>The society has published over XX original works of historical interest.</p>
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
