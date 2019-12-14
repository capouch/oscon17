import React from 'react'

// Render composite component - Select widget + Subscribe Button
const Announce = () => (
  <div>
    <h2><center>Announcement Page</center></h2>
    <h4>Placeholder for news on: { this.props.match.params.topic }</h4>
  </div>
)

export default Announce
