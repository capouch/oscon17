// modules/Repo.js
import React from 'react'

export default React.createClass({
  render() {
    console.log(this.props.params.imageId);
    return (
      <div>
        <h2>{this.props.params.imageId}</h2>
      </div>
    )
  }
})
