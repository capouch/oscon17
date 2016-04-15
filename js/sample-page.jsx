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
} from "neal-react";
import DropZoneComponent from 'react-dropzone-component'
import Upload from './Upload'
import Browse from './Browse'

const brandName = "Scene:History";
const brand = <span>{brandName}</span>;

const onSignup = ({ name: name, email: email, password: password }) => Stripe.StripeHandler.open({
  name: "Stripe Integration Included",
  description: "Like this? Donate $5 <3",
  panelLabel: "Donate {{amount}}",
  email: email,
  amount: 500,
});

const businessAddress = (
  <address>
    <strong>{brandName}</strong><br/>
    Saint Joseph's College<br/>
    Rensselaer IN 47978<br/>
    +1 (219) 866-6000
  </address>
);


const sampleCode = `  componentDidMount: function() {
    this.loadRecordsFromServer();
    // This polls the server; not quite sure why . . .
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div>
        <center><h2>Current image data</h2></center>
        <SearchBar />
        <Griddle results={this.state.records}
          columns={['title','filename', "description"]}
          columnMetadata={customColumnMetadata}
          showSettings={true}
          />
      </div>
    )}
  });
`;


export default (props) => {
  return (
    <Page>

      <Navbar brand={brand}>
        <NavItem><Link to="Home" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="Home" className="nav-link">Splash</Link></NavItem>
        <NavItem dropdown={true}>
          <DropdownToggle>Older versions</DropdownToggle>
          <DropdownMenu>
            <a href="http://oscon.saintjoe-cs.org:8000/" className="dropdown-item" target="_blank">
              2015 Page
            </a>
            <a href="http://oscon-sb.saintjoe-cs.org:5000" className="dropdown-item" target="_blank">
              2016 Page
            </a>
            <a href="/oscon-test" className="dropdown-item" target="_blank">
              GraphiQL
            </a>
          </DropdownMenu>
        </NavItem>
      </Navbar>

      <Hero backgroundImage="img/background.png"
        className="text-xs-center">
        <h1 className="display-4">Scene: History </h1>
        <p className="lead">Archiving and Presenting Historical Images</p>
        <p>
          <a href="https://github.com/capouch/neal-sample.git" target="_blank" className="btn btn-white">
            Get it on Github
          </a>
        </p>
      </Hero>

      <Section className="subhero">
        <ImageList centered>
          <ImageListItem src="img/press/sjcLogo.png" url="http://www.saintjoe.edu"/>
          <ImageListItem src="img/press/forbes-logo.png" url="http://forbes.com/"/>
          <ImageListItem src="img/press/theverge-logo.png" url="http://www.theverge.com/"/>
          <ImageListItem src="img/press/techcrunch-logo.jpg" url="http://techcrunch.com/"/>
        </ImageList>
      </Section>

      <Section className="nopad-bottom">
        <Code lang="jsx" block>{sampleCode}</Code>
      </Section>

      <Section>
        <Upload
          className="display-4"/>
      </Section>

      <Section>
        <Browse
          className = "display-4"/>
      </Section>

      <Section>
        <HorizontalSplit padding="md">
          <div>
            <p className="lead">Batteries Included</p>
            <p>Neal is based on <a href="http://v4-alpha.getbootstrap.com/" target="_blank">Bootstrap 4</a> and ships with navbar, hero, footer, sections, horizontal split, pricing tables, customer quotes and other components you need for a landing page. No more repetitive coding! Oh, and it's easy to extend.</p>
          </div>
          <div>
            <p className="lead">Third-Party Integrations</p>
            <p>External integrations like &nbsp;
              <a href="http://www.google.com/analytics/">Google Analytics</a>,&nbsp;
              <a href="https://segment.com/">Segment</a>,&nbsp;
              <a href="https://stripe.com/">Stripe</a> and&nbsp;
              <a href="http://typeform.com">Typeform</a> are included.
              No more copying & pasting integration code, all you need is your API keys. We automatically track events when visitors navigate to different parts of your page.</p>
          </div>
          <div>
            <p className="lead">Serverless Deployment</p>
            <p>Because you are relying on react.js and third-party integration you don't need a server to host your landing page. Simply upload it to an Amazon S3 bucket, enable website hosting, and it's ready to go!</p>
          </div>
        </HorizontalSplit>
      </Section>

      <Section heading="Inline and Modal Signup components" className="gray">
        <p>Use these components to capture user data, display a payment dialog and/or send them to your own backend for handling. Of course, you could also just use a Typeform to collect user emails. </p>
        <SignupInline onSubmit={onSignup}/>
        <SignupModal modalId="signup-modal" onSubmit={onSignup}/>
        <p>
          <a className="btn btn-primary btn-ghost" data-toggle="modal" data-target="#signup-modal">Show Signup modal</a>
        </p>
      </Section>

      <Section>
        <CustomerQuotes>
          <CustomerQuote name="Danilo Zekovic" title="Saint Joe" imageUrl="img/people/daniloOSCON.jpg">
            <p>What I tell founders is not to sweat the business model too much at first. The most important task at first is to build something people want. If you don't do that, it won't matter how clever your business model is.</p>
          </CustomerQuote>
          <CustomerQuote name="Elon Musk" imageUrl="img/people/elonmusk.jpg">
            <p>I came to the conclusion that we should aspire to increase the scope and scale of human consciousness in order to better understand what questions to ask. Really, the only thing that makes sense is to strive for greater collective enlightenment.</p>
          </CustomerQuote>
          <CustomerQuote name="Ben Davisson" title="Saint Joe" imageUrl="img/people/benOSCON.jpg">
            <p>If you are not embarrassed by the first version of your product, you've launched too late.</p>
          </CustomerQuote>
        </CustomerQuotes>
      </Section>

      <Footer brandName={brandName}
        facebookUrl="http://www.facebook.com/brian.capouch"
        githubUrl="https://github.com/capouch"
        address={businessAddress}>
      </Footer>
    </Page>
  );
};
