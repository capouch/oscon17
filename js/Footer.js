/*
  ** Common footer used by all views
*/

// import React from '../public/libs/react'
import React from 'react'
import {
  Footer, FooterAddress,
} from "neal-react"

// We appropriate slightly inappropriate names from neal-react sample app
const brandName = "Scene:History"
const brand = <span>{brandName}</span>

const businessAddress = (
  <address>
    <strong>{brandName}</strong><br/>
    Palaver Consulting<br/>
    8979 N. Lowes Road<br />
    Monon IN 47959<br/>
    +1 (219) 253-8181
  </address>
)

const NavFooter = React.createClass({
  render() {
    return (
      <Footer brandName={brandName}
        facebookUrl="http://www.facebook.com/brian.capouch"
        githubUrl="https://github.com/capouch"
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
