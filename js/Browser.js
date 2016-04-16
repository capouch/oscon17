import React from "react";
import { Link } from "react-router";
import {
  DropdownMenu, DropdownToggle,
  Footer, FooterAddress,
  Navbar, NavItem,
  Page,
  Section,
} from "neal-react";

import Browse from './Browse'

const businessAddress = (
  <address>
    <strong>{brandName}</strong><br/>
    Saint Josephs College<br/>
    Rensselaer IN 47978<br/>
    +1 (219) 866-6000
  </address>
);

const brandName = "Scene:History";
const brand = <span>{brandName}</span>;

export default (props) => {
  return (
    <Page>

      <Navbar brand={brand}>
        <NavItem><Link to="Home" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="browse" className="nav-link">Browse</Link></NavItem>
        <NavItem><Link to="upload" className="nav-link">Upload</Link></NavItem>
        <NavItem><Link to="zoomer" className="nav-link">Zoomer</Link></NavItem>
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

      <Section>
        <Browse
          className = "display-4"/>
      </Section>

      <Footer brandName={brandName}
        facebookUrl="http://www.facebook.com/brian.capouch"
        githubUrl="https://github.com/capouch"
        address={businessAddress}>
      </Footer>
    </Page>
  );
};
