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
  PricingPlan, PricingTable,
  Section,
  SignupInline, SignupModal,
  Stripe,
  Team,
  TeamMember,
} from "neal-react"

const onSignup = ({ name: name, email: email, password: password }) => Stripe.StripeHandler.open({
  name: "Stripe Integration Included",
  description: "Like this? Donate $5 <3",
  panelLabel: "Donate {{amount}}",
  email: email,
  amount: 500,
})

const sampleCode =
`getInitialState: function() {
  let initValues = {
    records: [],
    fetchURL: ""
  }
  console.log('Getting state again')
  if (localStorage.getItem('browse')) {
    initValues = JSON.parse(localStorage.getItem('browse'))
    }
  console.log('Init values ' + JSON.stringify(initValues))
  return initValues;
},
componentDidMount: function() {
  console.log('Mounting event')
  queryTarget = this.state.fetchURL
  this.state.fetchURL = this.props.url
  // console.log('Query target before:' + queryTarget)
  // Strip off URL prefix
  // Note should we do something if it can't find the '?'
  if (queryTarget.indexOf('?')) {
    queryTarget = queryTarget.substring((queryTarget.indexOf('?')+1))
  }
`


export default (props) => {
  return (
    <Page>

      <Hero backgroundImage="img/background.png"
        className="text-xs-center">
        <h1 className="display-4">Scene: History </h1>
        <p className="lead">Archiving and Presenting Historical Images</p>
        <p>
          <a href="https://github.com/capouch/oscon16" target="_blank" className="btn btn-white">
            Get it on Github
          </a>
        </p>
      </Hero>

      <Section className="subhero">
        <ImageList centered>
          <ImageListItem src="img/press/sjcLogo.gif" url="http://www.saintjoe.edu"/>
        </ImageList>
      </Section>

      <Section className="nopad-bottom">
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
            <p>What I tell founders is not to sweat the business model too much at first. The most important task at first is to build something people want. If you don't do that, it won't matter how clever your business model is. -- Borrowed Quote</p>
          </CustomerQuote>
          <CustomerQuote name="Brian Capouch" imageUrl="img/people/bcOSCON.jpg">
            <p>The essence of the SPA is that the strictly genericized browser engine will become the standard virtual application container: on the web, on mobile devices, and on the desktop.</p>
          </CustomerQuote>
          <CustomerQuote name="Ben Davisson" imageUrl="img/people/benOSCON.jpg">
            <p>If you are not embarrassed by the first version of your product, you've launched too late.   -- Borrowed Quote</p>
          </CustomerQuote>
        </CustomerQuotes>
      </Section>

    </Page>
  )
}
