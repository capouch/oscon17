/*
  ** Confirmation: Provide confirmation feedback and "do another" link
    This view is posted as "Step 2" of the Upload functionalty
    and is also used after editing
*/

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <center>
        <h1>Thanks for your submission</h1>
        <h1>Click <a style={{cursor:'pointer'}} onClick={this.props.resetStep}>here</a> to continue</h1>
        </center>
      </div>
    )
  }
}
