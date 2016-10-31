import React from 'react'

// We use neal-react component structure
import { App } from "neal-react"

// Page header and footer
import Header from './Header'
import Footer from './Footer'

// Note: check to make sure this has to be in "both placess"
import { browserHistory } from "react-router/es"

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
