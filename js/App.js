import React from 'react'

// We use neal-react component structure
import { App } from "neal-react"

// Page header and footer
import Header from './Header'
import Footer from './Footer'

export default class extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <App>
          { this.props.children }
        </App>
        <Footer />
      </div>
    )
  }
}
