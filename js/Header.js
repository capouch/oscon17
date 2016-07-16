/*
  ** Common "Navbar" header used by all views
*/

import React from "react"
import { Link } from "react-router"
import {
  Navbar, NavItem,
  DropdownMenu, DropdownToggle,
  SignupModal,
} from "neal-react"

import NavLink from './NavLink'
import { browserHistory } from 'react-router'

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
      authFunc: this.toggleSignIn,
      userName: '',
      authPrompt: 'Blarney',
      email: '',
      password: ''
      }
  },
  componentDidMount: function() {
    // This callback seems to confuse react after the first time it's called
    //   but overall it works--is called on each log in/out
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    if (this.checkSignedInWithMessage()) {
      this.setState({
        userName: "",
        authPrompt: ' (Logout)'
      })
    }
  },
  onSignIn: function({ name: name, email: email, password: password }) {
      console.log('email/password: ' + email + " "  + password)
      // Note callback here!
      this.setState({email: email, password: password}, function(){
          this.toggleSignIn()
          }.bind(this))
  },
  toggleSignIn: function() {
    // Sign in Firebase using email as the identity provider
    //   Only email for now--maybe ever?
      if (firebase.auth().currentUser) {
        // [START signout]
        console.log("Signing out")
        firebase.auth().signOut();
        // [END signout]
      } else {
        // var email = document.getElementById('email').value;
        // var password = document.getElementById('password').value;
        console.log('Got down here with: ' + this.state.email + ' ' + this.state.password)
        if (this.state.email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (this.state.password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
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
        authFunc: this.toggleSignIn,
        userName: user.displayName,
        authPrompt:  'Logout'
      })
      console.log('User is logged in!!')
    }
    else {
      this.setState( {
        userName: '',
        email: '',
        password: ''
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

    if (this.checkSignedInWithMessage()) {
      // render with sign-in popup
      console.log('Rendering user-is-logged-in page')
        // Render with logout
        return (
        <Navbar brand={brand}>
          <NavItem><NavLink to="/home" className="nav-link">Home</NavLink></NavItem>
          <NavItem><a onClick={this.state.authFunc} style={{cursor:'pointer'}}className="nav-link"><span style={nameStyle}>{this.state.userName}</span>{this.state.authPrompt}</a></NavItem>
          <NavItem><NavLink to="/browse" className="nav-link">Browse</NavLink></NavItem>
          <NavItem><NavLink to="/slides" className="nav-link">Slideshow</NavLink></NavItem>
          <NavItem><NavLink to="/upload" className="nav-link">Upload</NavLink></NavItem>
        </Navbar>
      )}
    else {
      console.log('Rendering user-is-logged-out page')
    return (
      <div>
      <SignupModal modalId="signup-modal" onSubmit={this.onSignIn}
        title="Sign In" buttonText="Sign In"/>
      <Navbar brand={brand}>
        <NavItem><NavLink to="/home" className="nav-link">Home</NavLink></NavItem>
        <NavItem><a data-toggle="modal" data-target="#signup-modal" style={{cursor:'pointer'}} className='nav-link'>Login</a></NavItem>
        <NavItem><NavLink to="/browse" className="nav-link">Browse</NavLink></NavItem>
        <NavItem><NavLink to="/slides" className="nav-link">Slideshow</NavLink></NavItem>
        <NavItem><NavLink to="/upload" className="nav-link">Upload</NavLink></NavItem>
        </Navbar>
      </div>
      )}
    }
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
