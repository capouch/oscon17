// Module to handle push-notify subscriptions
import React from "react"
import { Link } from "react-router-dom"

// Wrap an HTML button into a component
const buttonStyle = {
  margin: '10px 10px 10px 0'
}

const Button = React.createClass({
  getInitialState: function() {

    let label = isSubscribed?'Unsubscribe':'Subscribe'
    let initValues = {
      label: label,
      isSubscribed: isSubscribed
      }
    return initValues
    },
  updateBtn: function () {
    // Note this has to be done with a callback to catch initial state change
    if (isSubscribed) {
      unsubscribeUser()
      this.setState({label: 'Subscribe'})
    } else {
      subscribeUser()
      this.setState({label: 'Unsubscribe'})
    }
    // let text = (isSubscribed ? 'Unsubscribe':'Subscribe')
    // console.log('Set button text to: ' + text)
    // this.setState({label: text})
    console.log('State: ' + JSON.stringify(this.state))
    },
  render: function () {
    return (
      <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.updateBtn}>{this.state.label}</button>
    )
  }
})

// Render composite component
export default React.createClass ( {
  componentDidMount: function() {
    console.log('Mount main')
  },
  render() {
    return (
      <div>
        <center>
        <Button
          />
        </center>
      </div>
    )
  }
})

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');
    updateSubscriptionOnServer(subscription);
    isSubscribed = true;
    // updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    // updateBtn();
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    // Should this be uncommented?
    // updateSubscriptionOnServer(null);
    console.log('User is unsubscribed.');
    isSubscribed = false;

    // updateBtn();
  });
}

// Process fresh subscription
function updateSubscriptionOnServer(subscription) {
// Only talk to server if we have a subscription object
if (subscription) {
  // "Custom" groupings; for now just one chosen at random
  // ["watch", "warning", "closure", "amber, "police"]
  let value = Math.floor(Math.random() * 5)
  console.log('Random group value: ' + value)
  let tag = notifyGroups[value]
  console.log('Picked tag: ' + tag)
  let tagList = { tags: [tag] }
  sendSubscriptionToBackEnd(subscription, tagList)
  }
}

// Service routine to contact our speciic server
function sendSubscriptionToBackEnd(subscription, tagList) {
  // Convert the subscription to a simple object
  let bodyObject = subscription.toJSON()
  // Add tags to request object
  bodyObject = Object.assign({}, bodyObject, tagList)
  console.log('Body object 2: ' + JSON.stringify(bodyObject))

  return fetch('/save-subscription/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject)
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }
    // console.log('Subscribe response: ' + JSON.stringify(reponse.data))
    return response.json();
  })
  .then(function(responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server.');
    }
    console.log(JSON.stringify(responseData.data))
  });
}

// Service routine to create Uint8 array
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
