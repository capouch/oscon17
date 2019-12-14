import React, { useState, useEffect } from 'react'

// Example using react hooks, this component is same as one bellow
const SubscribeBtnWithHooks = () => {
  // Default to Login mode
  const [label, setLabel] = useState('Subscribe')
  const [subscribeDisabled, setSubscribeDisabled] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  // it is called on state or props value change
  useEffect(() => {
    let text = (isSubscribed ? 'Unsubscribe':'Subscribe')
    setLabel(text)
  }, [isSubscribed]); // here we tell it whose change will triger useEffect

  const updateBtn = () =>  {
    // this here will triger useEffect, also it is important to note that this is an async function
    setIsSubscribed(!isSubscribed)
  }

  return (
    <button
      className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      onClick={updateBtn}>{label}</button>
  )
}

// your refactored class component, which is perfectly fine. just compering it to new way of making everything a functional components
class SubscribeBtn extends React.Component {

  constructor(props) {
    super(props)
    // Default to Login mode
    this.state = {
      label: 'Subscribe',
      subscribeDisabled: false,
      isSubscribed: false
      }
  }

  updateBtn = () =>  {
    // Note this has to be done with a callback to catch initial state change
    this.setState({isSubscribed: !(this.state.isSubscribed)}, function() {
      let text = (this.state.isSubscribed ? 'Unsubscribe':'Subscribe')
      console.log('Set button text to: ' + text)
      this.setState({label: text})
      console.log('State: ' + JSON.stringify(this.state))
    })
  }

  render () {
    return (
      <button
        className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
        onClick={this.updateBtn}>{this.state.label}</button>
    )
  }
}

export default SubscribeBtn
