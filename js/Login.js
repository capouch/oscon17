
/*
    Login: Module to handle Firebase authentication
    Begun 9 July 2016
*/

import React from "react"
import { Section } from "neal-react"

// Wrap an HTML button into a component
const buttonStyle = {
  margin: '10px 10px 10px 0'
}
const Button = React.createClass({
  render: function () {
    return (
      <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.props.handleClick}>{this.props.label}</button>
    )
  }
})

export default React.createClass ( {
  getInitialState: function() {
    return {
      auth: firebase.auth(),
      gprovider: new firebase.auth.GoogleAuthProvider,
      fprovider = new firebase.auth.FacebookAuthProvider(),
      isLoggedIn: false
      }
  },
  componentWillMount: function() {
    // Something wrong here--this function gets called twice after second render
    this.state.auth.onAuthStateChanged(this.onAuthStateChanged)
   },
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
  signIn: function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
    this.state.auth.signInWithPopup(this.state.gprovider);
  },
  gSignIn: function () {
    firebase.auth().signInWithPopup(this.state.fprovider).then(function(result) {
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
  // ...
  });
  }
  signOut:  function() {
  // Sign out of Firebase.
    this.state.auth.signOut();
  },
  // Returns true if user is signed-in. Otherwise false and displays a message.
  checkSignedInWithMessage: function() {
    // Return true if the user is signed in Firebase
    if (this.state.auth.currentUser) {
      return true;
    }

    // This structure doesn't do anything at present
    // Display a message to the user using a Toast.
    let data = {
      message: 'You must sign-in first',
      timeout: 2000
    };
    // this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
    return false
  },
  render: function() {
    if (this.checkSignedInWithMessage())
       return (
         <Section>
          <div><center><h2>Logged in and ready!!</h2></center></div>
          <Button
            label="Log out"
            handleClick={this.signOut}
            />
         </Section>
       )
    else
      return (
        <Section>
         <div><center><h2>You are not authorized!!</h2></center></div>
         <Button
           label="Log in with Google"
           handleClick={this.signIn}
          />
           <Button
             label="Log in with Facebook"
             handleClick={this.gSignIn}
          />
        </Section>
      )
    }
  })
