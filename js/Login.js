
/*
    Login: Module to handle Firebase authentication
    Begun 9 July 2016
*/

import React from "react"
import { Section } from "neal-react"

// Wrap an HTML input element into a component
const buttonStyle = {
  margin: '10px 10px 10px 0'
}
class Button extends React.Component {
  render() {
    return (
      <input
        type="image"
        className="btn btn-default"
        // style={buttonStyle}
        src={this.props.image}
        onClick={this.props.handleClick}></input>
    )
  }
}

export default class extends React.Component {
  getInitialState() {
    return {
      isLoggedIn: false,
      }
  }

  componentWillMount() {
    // This callback seems to confuse react after the first time it's called
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
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
  }

  googleSignIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }

  fbSignIn() {
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
  }

  /* Code below will need to be used to resolve Firebase's only one email deal
  // In other words, this is documentation for a future work session
  auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function(error) {
  // An error happened.
  if (error.code === 'auth/account-exists-with-different-credential') {
    // Step 2.
    // User's email already exists.
    // The pending Facebook credential.
    var pendingCred = error.credential;
    // The provider account's email address.
    var email = error.email;
    // Get registered providers for this email.
    auth.fetchProvidersForEmail(email).then(function(providers) {
      // Step 3.
      // If the user has several providers,
      // the first provider in the list will be the "recommended" provider to use.
      if (providers[0] === 'password') {
        // Asks the user his password.
        // In real scenario, you should handle this asynchronously.
        var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
        auth.signInWithEmailAndPassword(email, password).then(function(user) {
          // Step 4a.
          return user.link(pendingCred);
        }).then(function() {
          // Facebook account successfully linked to the existing Firebase user.
          goToApp();
        });
        return;
      }
      // All the other cases are external providers.
      // Construct provider object for that provider.
      // TODO: implement getProviderForProviderId.
      var provider = getProviderForProviderId(providers[0]);
      // At this point, you should let the user know that he already has an account
      // but with a different provider, and let him validate the fact he wants to
      // sign in with this provider.
      // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
      // so in real scenario you should ask the user to click on a "continue" button
      // that will trigger the signInWithPopup.
      auth.signInWithPopup(provider).then(function(result) {
        // Remember that the user may have signed in with an account that has a different email
        // address than the first one. This can happen as Firebase doesn't control the provider's
        // sign in flow and the user is free to login using whichever account he owns.
        // Step 4b.
        // Link to Facebook credential.
        // As we have access to the pending credential, we can directly call the link method.
        result.user.link(pendingCred).then(function() {
          // Facebook account successfully linked to the existing Firebase user.
          goToApp();
        });
      });
    });
  }
});
*/
  signOut() {
  // Sign out of Firebase.
    firebase.auth().signOut();
  }

  // Returns true if user is signed-in. Otherwise false and displays a message.
  checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    if (firebase.auth().currentUser) {
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
  }

  render() {
    if (this.checkSignedInWithMessage())
       return (
         <Section>
          <div><center><h2>You are signed in!</h2></center></div>
          <Button
            image='img/logout.png'
            handleClick={this.signOut}
            />
         </Section>
       )
    else
      return (
        <Section>
         <div><center><h2>Please sign in to upload or edit</h2></center></div>
         <div>
         <Button
           image='img/google.png'
           handleClick={this.googleSignIn}
          />
        <p/>
           <Button
             image='img/facebook.png'
             handleClick={this.fbSignIn}
          />
        </div>
        </Section>
      )
    }
  }
