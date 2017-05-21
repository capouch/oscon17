/*
  ** Common footer used by all views
*/

import React from 'react'
import {
  Footer, FooterAddress,
} from "neal-react"

// We appropriate slightly inappropriate names from neal-react sample app
const brandName = "WCHS"
const brand = <span>{brandName}</span>

const businessAddress = (
  <address>
    <strong>{brandName}</strong><br/>
    White County Historical Society<br/>
    101 South Bluff St.<br />
    Monticello, IN 47960<br/>
    +1 (574) 583-3998<br />
    <a href="mailto:museum@lightstreamin.com">Email us!</a><br />
  </address>
)

const NavFooter = React.createClass({
  render() {
    return (
      <Footer brandName={brandName}
        facebookUrl="http://www.facebook.com/White-County-Indiana-Historical-Society-112322192144341/"
        address={businessAddress}>
      </Footer>
      )
    }
  })

// We keep default export object anonymous
export default class extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
          <NavFooter/>
      )
    }
  }
