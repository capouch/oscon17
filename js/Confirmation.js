/*
  ** Confirmation: Provide confirmation feedback and "do another" link
    This view is posted as "Step 2" of the Upload functionalty
    and is also used after editing
*/

import React from 'react'
import { Link } from 'react-router-dom'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('Conf props: ', JSON.stringify(this.props))
    return (
      <div>
        <center>
        <h1>Thanks for your submission</h1>
        <h1>Click <Link to='/browse'>here</Link> to continue</h1>
        </center>
      </div>
    )
  }
}
