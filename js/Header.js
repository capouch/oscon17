/*
  ** Common "Navbar" header used by all views
*/

import React from "react"
import { Link } from "react-router"
import {
  Navbar, NavItem,
  DropdownMenu, DropdownToggle,
} from "neal-react"

import NavLink from './NavLink'

const brandName = "Independence Church"
const brand = <span>{brandName}</span>

const NavHeader = React.createClass({
  render() {
    return (
      <Navbar brand={brand}>
        <NavItem><NavLink to="/home" className="nav-link">Home</NavLink></NavItem>
        <NavItem><NavLink to="/login-out" className="nav-link">Login/Logout</NavLink></NavItem>
        <NavItem><NavLink to="/browse" className="nav-link">Browse</NavLink></NavItem>
        <NavItem><NavLink to="/slides" className="nav-link">Slideshow</NavLink></NavItem>
        <NavItem><NavLink to="/zoomer" className="nav-link">Cemetery</NavLink></NavItem>
        <NavItem><NavLink to="/upload" className="nav-link">Upload</NavLink></NavItem>
        <NavItem><NavLink to="/zoomer" className="nav-link">Zoomer</NavLink></NavItem>
      </Navbar>
      )}
    })

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <NavHeader/>
    )
  }
}
