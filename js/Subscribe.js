// Module to handle push-notify subscriptions
import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import Select from 'react-select';

// This variable currently not used
const notifyGroups = ["image", "news", "publish", "program", "meeting"]

// Current values of selected notify tags
var tagValues = ""

// Config for react-select component for notify categories
// In the world of ag, "markets, weather, sensors, legal, technical"
var options = [
  { value: 'image', label: 'New Images' },
  { value: 'news', label: 'Newsletter' },
  { value: 'publish', label: 'Publication Available' },
  { value: 'program', label: 'Program Announcement' },
  { value: 'meeting', label: 'Board Meeting' },
];

// Wrap an HTML button into a subscribe buttoncomponent
const buttonStyle = {
  margin: '10px 10px 10px 0'
}

class SubscribeButton extends React.Component {
  constructor(props) {
    super(props);
    let label = isSubscribed?'Unsubscribe':'Subscribe'
    this.state = {
      label: label,
      enabled: true
    }
  }

  componentDidMount() {
    console.log('Mount curent state of isSubscribed: ' + isSubscribed)
    let label = isSubscribed?'Unsubscribe':'Subscribe'
    this.setState({label: label})
  }

  // Click handler for Subscribe button
  updateBtn = () =>  {
    if (isSubscribed) {
      console.log('Tag values: ' + tagValues)
        unsubscribeUser()
        this.setState({label: 'Subscribe'})
    } else {
      // Don't subscribe if no notify groups chosen
      if (tagValues || (tagValues.length != 0)) {
        subscribeUser()
        this.setState({label: 'Unsubscribe'})
        }
    }
  }

  render() {
    return (
      <button
        className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
        style={buttonStyle}
        onClick={this.updateBtn}>{this.state.label}</button>
    )
  }
}

// Render composite component - Select widget + Subscribe Button
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
			crazy: false,
			options: options,
			value: [],
    }
  }

  componentDidMount() {
    if (tagValues.length > 0 ) {
      // These are the topics currently subscribed
      console.log('We should tell the user about tags ' + tagValues)
      tagValues = ""
      }
  }

  // Configure and post react-select component
  displayName: 'MultiSelectField'
  
	propTypes: {
		label: PropTypes.string,
	}

  // Called for each select/deselect of a topic
	handleSelectChange = (value) => {
		this.setState({ value },function(){
      tagValues = this.state.value
      console.log('Value = ' + this.state.value + ' ' + JSON.stringify(tagValues))
    })
	}

  render() {
    return (
      <div>
        <h3><center>Subscribe to event notifications</center></h3>
        <Select multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Select notifications" options={this.state.options} onChange={this.handleSelectChange} />
        <center>
        <SubscribeButton
          />
        </center>
      </div>
    )
  }
}

// Service routines to handle subscription activities
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
    // We need to disable the SubscribeButton here
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
    // tagValues = ""


    // updateBtn();
  });
}

// Process fresh subscription
function updateSubscriptionOnServer(subscription) {
// Only talk to server if we have a subscription object
if (subscription) {
  sendSubscriptionToBackEnd(subscription)
  }
}

// Service routine to contact our speciic server
function sendSubscriptionToBackEnd(subscription) {
  // Convert the subscription to a simple object
  let bodyObject = subscription.toJSON()

  // Add selected tags to request object
  let tagList = { tags: tagValues.split(',') }
  bodyObject = Object.assign({}, bodyObject, tagList)
  console.log('Body object: ' + JSON.stringify(bodyObject))

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

// Service routine to create Uint8 array for subscribe
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

function wasteLand() {
  // Code I might need and am keeping for safety

  // "Custom" groupings; for now just one chosen at random
  // ["watch", "warning", "closure", "amber, "police"]
  let value = Math.floor(Math.random() * 5)
  console.log('Random group value: ' + value)
  let tag = notifyGroups[value]
  console.log('Picked tag: ' + tag)
  let tagList = { tags: [tag] }
}
