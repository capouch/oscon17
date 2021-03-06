/*
  ** Common "Navbar" header used by all views
*/

import React from "react"
import { Link } from "react-router-dom"
import {
  Navbar, NavItem,
  DropdownMenu, DropdownToggle,
  SignupModal,
} from "neal-react"

import { NavLink } from 'react-router-dom'

// NealReact configuration
const brandName = "Scene:History"
const brand = <span>{brandName}</span>

// Currently not used due to change in login method
const nameStyle = {
  fontWeight: 'bold',
  color: 'maroon',
}

let loginModal = undefined,
authNavItem = undefined

const buttonStyle = {
  margin: '12px 12px 12px 0'
}

const SubscribeBtn = React.createClass({
  getInitialState: function() {
    // Default to Login mode
    return {
      label: 'Subscribe',
      subscribeDisabled: false,
      isSubscribed: false
      }
  },
  updateBtn () {
    // Note this has to be done with a callback to catch initial state change
    this.setState({isSubscribed: !(this.state.isSubscribed)}, function() {
      let text = (this.state.isSubscribed ? 'Unsubscribe':'Subscribe')
      console.log('Set button text to: ' + text)
      this.setState({label: text})
      console.log('State: ' + JSON.stringify(this.state))
    })
  },
  render: function () {
    return (
      <button
        className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
        onClick={this.updateBtn}>{this.state.label}</button>
    )
  }
})

// Puzzle: at first call, this component mounts *twice*
//  and I can't figure out why.  Doesn't hurt anything, but yet . . . .
const NavHeader = React.createClass({
  getInitialState: function() {
    // Default to Login mode
    return {
      authFunc: this.toggleSignIn,
      userName: '',
      authPrompt: '',
      email: '',
      password: '',
      }
  },
  componentWillMount: function() {
    // This callback seems to confuse react after the first time it's called
    //   but overall it works--is called on each log in/out
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    /*
    if (this.checkSignedInWithMessage()) {
      this.setState({
        userName: "",
        authPrompt: ' (Logout)'
      })
    }
    */
  },
  onSignIn: function({ name: name, email: email, password: password }) {
      // console.log('email/password: ' + email + " "  + password)
      // Note callback here!
      this.setState({email: email, password: password}, function(){
        // I DON'T WANT to use jQuery!!
        $('#signup-modal').modal('toggle')
        this.toggleSignIn()
        }.bind(this))
  },
  toggleSignIn: function() {
    // Sign in Firebase using email as the identity provider
    //   Only email for now--maybe ever?
      if (firebase.auth().currentUser) {
        // [START signout]
        // console.log("Signing out")
        firebase.auth().signOut();
        // [END signout]
      } else {
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
    console.log('onAuthStateChanged called')
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
    console.log('State: ' + JSON.stringify(this.state))
    // Logic to determine login/logout UI
    if (this.checkSignedInWithMessage()) {
      // User is signed in; configure for logging out
      console.log('About to render logout view')
      loginModal = undefined
      authNavItem = <NavItem><a onClick={this.state.authFunc} style={{cursor:'pointer'}}className="nav-link"><span style={nameStyle}>{this.state.userName}</span>{this.state.authPrompt}</a></NavItem>
    } else {
      // Set modal and menu for login
      console.log('About to render login view')
      // SingupModal uses now-deprecated modal dialog window; needs replaced
      loginModal =
      <SignupModal modalId="signup-modal" onSubmit={this.onSignIn} title="Sign In" buttonText="Sign In">
        <div>
          <SignupModal.Input type="email" required name="email" label="Email" placeholder="Email"/>
          <SignupModal.Input type="password" required name="password" label="Password" placeholder="Password"/>
        </div>
      </SignupModal>

      // Menu option for logging in
      authNavItem = <NavItem><a data-toggle="modal" data-target="#signup-modal" style={{cursor:'pointer'}} className='nav-link'>Login</a></NavItem>
      }

      return (
        <div>
          {loginModal}
          <Navbar brand={brand}>
            <NavItem><NavLink to="/home" className="nav-link">Home</NavLink></NavItem>
            {authNavItem}
            <NavItem><NavLink to="/browse" className="nav-link">Browse</NavLink></NavItem>
            <NavItem><NavLink to="/upload" className="nav-link">Upload</NavLink></NavItem>
            <NavItem><NavLink to="/subscribe" className="nav-link">Notifications</NavLink></NavItem>
          </Navbar>
        </div>
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
