/*
  ** Navlink: Create a Link component with extra foo
    Borrowed essentially verbatim from the react-router-tutorial, which is great
*/

import React from 'react'
import { Link } from 'react-router-dom/es'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})
