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
  getInitialState: function() {
    // Default to Login mode
    return {
      isLoggedIn: false,
      authFunc: this.authIn,
      authPrompt: 'Login'
      }
  },
  componentDidMount: function() {
    // This callback seems to confuse react after the first time it's called
    //   but overall it works--is called on each log in/out
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    if (this.checkSignedInWithMessage) {
      this.setState({
        isLoggedIn: true,
        authFunc: this.signOut,
        authPrompt: 'Logout'
      })
    }
   },
  signOut:  function() {
  // Sign out of Firebase.
    firebase.auth().signOut()
  },
  authIn: function() {
    // Sign in Firebase using popup auth and Google as the identity provider
    //   Only Google for now--maybe ever?
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider)
  },
  onAuthStateChanged: function(user) {
    // Swap menu state and re-render Header component
    if (user) {
      this.setState( {
        isLoggedIn: true,
        authFunc: this.signOut,
        authPrompt: 'Logout'
      })
      console.log('User is logged in!!')
    }
    else {
      this.setState( {
        isLoggedIn: false,
        authFunc: this.authIn,
        authPrompt: 'Login'
      })
      console.log('User is logged out')
    }
  },
  checkSignedInWithMessage () {
    // Return true if the user is signed in Firebase
      return firebase.auth().currentUser
  },
  render() {
    let authFunc = this.authIn,
      authPrompt = 'Login'

    return (
      // Menu header refreshes on each auth state change
      <Navbar brand={brand}>
        <NavItem>
          <NavLink to="/home" className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <a onClick={this.state.authFunc} className="nav-link">{this.state.authPrompt}</a>
        </NavItem>
        <NavItem>
          <NavLink to="/browse" className="nav-link">Browse</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/slides" className="nav-link">Slideshow</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/upload" className="nav-link">Upload</NavLink>
        </NavItem>
        <NavItem>
          <a
            href="http://www.independence-church.org"
            target="_blank"
            className="nav-link">
            Old Site
          </a>
        </NavItem>
      </Navbar>
    )}
  })

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
      return (
        <NavHeader/>
    )
  }
}
