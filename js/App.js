import React from 'react'

// We use neal-react component structure
import { App } from "neal-react"

// Page header and footer
import Header from './Header'
import Footer from './Footer'

import { browserHistory } from "react-router"

export default class extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <App
          history={ browserHistory }>
          { this.props.children }
        </App>
        <Footer />
      </div>
    )
  }
}
