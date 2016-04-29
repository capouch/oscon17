import React from "react";
import { Link } from "react-router";
import {
  Navbar, NavItem,
  DropdownMenu, DropdownToggle,
} from "neal-react";

import NavLink from './NavLink';

const brandName = "Scene:History";
const brand = <span>{brandName}</span>;

let NavHeader = React.createClass({
  render() {
    return (
      <Navbar brand={brand}>
        <NavItem><NavLink to="/home" className="nav-link">Home</NavLink></NavItem>
        <NavItem><NavLink to="/browse" className="nav-link">Browse</NavLink></NavItem>
        <NavItem><NavLink to="/images" className="nav-link">Slideshow</NavLink></NavItem>
        <NavItem><NavLink to="/upload" className="nav-link">Upload</NavLink></NavItem>
        <NavItem><NavLink to="/zoomer" className="nav-link">Zoomer</NavLink></NavItem>
        <NavItem dropdown={true}>
          <DropdownToggle>Other versions</DropdownToggle>
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
      )}
    })

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <NavHeader/>
    );
  }
}

export default Header;
