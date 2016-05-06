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

// We are passing in the path via electron-window
const urlBase = window.__args__.data + '/public/';

const onSignup = ({ name: name, email: email, password: password }) => Stripe.StripeHandler.open({
  name: "Stripe Integration Included",
  description: "Like this? Donate $5 <3",
  panelLabel: "Donate {{amount}}",
  email: email,
  amount: 500,
});

const sampleCode =
`  class Upload extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
        <DropZoneComponent  config={componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig} />,
        </div>
      );
    }
  }

  export default Upload;
`;


export default (props) => {
  return (
    <Page>

      <Hero backgroundImage={ urlBase  + "img/background.png" }
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
          <ImageListItem src={ urlBase  + "img/press/sjcLogo.png" } url="http://www.saintjoe.edu"/>
        </ImageList>
      </Section>

      <Section className="nopad-bottom">
        <Code lang="jsx" block>{sampleCode}</Code>
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

      <Section>
        <CustomerQuotes>
          <CustomerQuote name="Danilo Zekovic" imageUrl={ urlBase  + "img/people/daniloOSCON.jpg" }>
            <p>What I tell founders is not to sweat the business model too much at first. The most important task at first is to build something people want. If you don't do that, it won't matter how clever your business model is. -- Borrowed Quote</p>
          </CustomerQuote>
          <CustomerQuote name="Brian Capouch" imageUrl={ urlBase  + "img/people/bcOSCON.jpg" }>
            <p>The essence of the SPA is that the strictly genericized browser engine will become the standard virtual application container: on the web, on mobile devices, and on the desktop.</p>
          </CustomerQuote>
          <CustomerQuote name="Ben Davisson" imageUrl={ urlBase  + "img/people/benOSCON.jpg" }>
            <p>If you are not embarrassed by the first version of your product, you've launched too late.   -- Borrowed Quote</p>
          </CustomerQuote>
        </CustomerQuotes>
      </Section>

    </Page>
  );
};
