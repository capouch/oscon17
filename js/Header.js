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

const brandName = "Scene:History"
const brand = <span>{brandName}</span>

  const nameStyle = {
    fontWeight: 'bold',
    color: 'maroon',
  }

const NavHeader = React.createClass({
  getInitialState: function() {
    // Default to Login mode
    return {
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
        authFunc: this.signOut,
        userName: "",
        authPrompt: ' (Logout)'
      })
    }
   },
  signOut:  function() {
  // Sign out of Firebase.
    firebase.auth().signOut()
  },
  authIn: function() {
    // Sign in Firebase using popup auth and email as the identity provider
    //   Only email for now--maybe ever?
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider)
  },
  onAuthStateChanged: function(user) {
    // Swap menu state and re-render Header anchor
    if (user) {
      this.setState( {
        authFunc: this.signOut,
        userName: user.displayName,
        authPrompt:  ' (Logout)'
      })
      console.log('User is logged in!!')
    }
    else {
      this.setState( {
        authFunc: this.authIn,
        userName: '',
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
      <Navbar brand={brand}>
        <NavItem><NavLink to="/home" className="nav-link">Home</NavLink></NavItem>
        <NavItem><a onClick={this.state.authFunc} style={{cursor:'pointer'}}className="nav-link"><span style={nameStyle}>{this.state.userName}</span>{this.state.authPrompt}</a></NavItem>
        <NavItem><NavLink to="/browse" className="nav-link">Browse</NavLink></NavItem>
        <NavItem><NavLink to="/slides" className="nav-link">Slideshow</NavLink></NavItem>
        <NavItem><NavLink to="/upload" className="nav-link">Upload</NavLink></NavItem>
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
