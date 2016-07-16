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
      authPrompt: 'Login'
      }
  },
  componentDidMount: function() {
    // This callback seems to confuse react after the first time it's called
    //   but overall it works--is called on each log in/out
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    if (this.checkSignedInWithMessage) {
      this.setState({
        userName: "",
        authPrompt: ' (Logout)'
      })
    }
   },
  toggleSignIn: function() {
    // Sign in Firebase using popup auth and email as the identity provider
    //   Only email for now--maybe ever?
    let email = 'brianc@palaver.net',
      password = "getlostman"
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        // var email = document.getElementById('email').value;
        // var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
  },
  onAuthStateChanged: function(user) {
    // Swap menu state and re-render Header anchor
    if (user) {
      this.setState( {
        userName: user.displayName,
        authPrompt:  ' (Logout)'
      })
      console.log('User is logged in!!')
    }
    else {
      this.setState( {
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
    let authPrompt = 'Login'

    return (
      <Navbar brand={brand}>
        <NavItem><NavLink to="/home" className="nav-link">Home</NavLink></NavItem>
        <NavItem><a onClick={this.toggleSignIn} style={{cursor:'pointer'}}className="nav-link"><span style={nameStyle}>{this.state.userName}</span>{this.state.authPrompt}</a></NavItem>
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
