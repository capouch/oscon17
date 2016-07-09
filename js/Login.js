let auth = firebase.auth(),
  provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider)
  auth.onAuthStateChanged(onAuthStateChanged.bind(this))

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
