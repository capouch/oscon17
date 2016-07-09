
/*
let auth = firebase.auth(),
  provider = new firebase.auth.GoogleAuthProvider()
  auth.onAuthStateChanged(function(user) {
    if (user)
      console.log('User is logged in!!')
    else
      console.log('User is logged out')
    }
  )
  auth.signInWithPopup(provider)
  auth.signOut()
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
      provider: new firebase.auth.GoogleAuthProvider,
      isLoggedIn: false
      }
  },
  componentDidMount: function() {
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
    this.state.auth.signInWithPopup(this.state.provider);
  },
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
           label="Log in"
           handleClick={this.signIn}
           />
        </Section>
      )
    }
  })

/*
let onAuthStateChanged = function(user) {
    if (user) { // User is signed in!
      // Get profile pic and user's name from the Firebase user object.
      var profilePicUrl = user.photoURL; // Only change these two lines!
      var userName = user.displayName;   // Only change these two lines!

      // Set the user's profile pic and name.
      this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
      this.userName.textContent = userName;

      // Show user's profile and sign-out button.
      this.userName.removeAttribute('hidden');
      this.userPic.removeAttribute('hidden');
      this.signOutButton.removeAttribute('hidden');

      // Hide sign-in button.
      this.signInButton.setAttribute('hidden', 'true');

      // We load currently existing chant messages.
      this.loadMessages();
    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      this.userName.setAttribute('hidden', 'true');
      this.userPic.setAttribute('hidden', 'true');
      this.signOutButton.setAttribute('hidden', 'true');

      // Show sign-in button.
      this.signInButton.removeAttribute('hidden');
    }
  };
*/
