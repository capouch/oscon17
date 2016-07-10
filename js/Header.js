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
    return {
      isLoggedIn: false,
      authFunc: this.authIn,
      authPrompt: 'Login'
      }
  },
  componentDidMount: function() {
    // This callback seems to confuse react after the first time it's called
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
    // Sign in Firebase using popup auth and Google as the identity provider.
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider)
  },
  onAuthStateChanged: function(user) {
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
    if (firebase.auth().currentUser) {
      return true
    }
  },
  render() {
    let authFunc = this.authIn,
      authPrompt = 'Login'

    return (
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

/*
  const NavHeader = React.createClass({
    onAuthStateChanged: function(user) {
      if (user) {
        this.setState( {isLoggedIn: true} )
        console.log('User is logged in!!')
      }
      else {
        this.setState( { isLoggedIn: false})
        console.log('User is logged out')
      }
    },
    googleSignIn: function() {
    // Sign in Firebase using popup auth and Google as the identity provider.
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
    },
    fbSignIn: function () {
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("Facebook failure: " + errorMessage + 'and ' + email)
        // ...
      });
    },
    render() {
      return (
        <Navbar brand={brand}>
          <NavItem>
            <NavLink to="/home" className="nav-link">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login-out" className="nav-link">Login/Logout</NavLink>
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
  */

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
