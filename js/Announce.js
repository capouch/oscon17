import React from 'react'

// Render composite component - Select widget + Subscribe Button
export default React.createClass ( {
  render() {
    return (
      <div>
        <h2><center>Announcement Page</center></h2>
        <h4>Placeholder for news on: { this.props.match.params.topic }</h4>
      </div>
    )
  }
})
