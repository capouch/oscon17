import React from 'react'
import {
  Footer, FooterAddress,
} from "neal-react"

const brandName = "Scene:History"
const brand = <span>{brandName}</span>

const businessAddress = (
  <address>
    <strong>{brandName}</strong><br/>
    Saint Josephs College<br/>
    Rensselaer IN 47978<br/>
    +1 (219) 866-6000
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

// Won't call this footer b/c the neal-react kit already uses the name
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
