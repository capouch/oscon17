/*
  ** Zoom: Wrap the OpenSeaDragon client in a React component
    The functionality provided by this module was the inspiration for the app
 */

import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'
import { Section } from 'neal-react'

// Function to configure and raise the OpenSeaDragon widget
const renderImage = function(selection) {
  // 1.
  // Use cloud-based image assets
  // const assetBase ="http://oscon.saintjoe-cs.org:2016/"
  //
  // Use local assets
  const assetBase = ''


  const baseName = assetBase + selection + '.dzi'
  console.log('In the renderImage method about to render ' + baseName)
  const viewer = OpenSeaDragon({
    id: "zoomer-view",
    prefixUrl: "/img-icons/",
    tileSources: baseName
  })
}

// Create a container class for the "Zoomer" component
class ZoomBox extends React.Component {
  // Create a container class for the "Zoomer" component
  componentDidMount() {
    let zoomTarget = this.props.image
    renderImage(zoomTarget)
  }

  render() {
    const style = {
      width: 800,
      height: 600
    }
    return (
      <div style={style} id="zoomer-view">
      </div>
    )
  }
}

// Render in a component
export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    // This module has two routes, and thus two entry points
    // The default case, i.e. Zoomer with no parameters
    let sendParms = "../tiles/bremer"
    // console.log("Zoomer props: ", JSON.stringify(this.props))

    // This fires when properties are sent explictly
    if ( this.props.match.params.imageId ) {
      sendParms = '../tiles/' + this.props.match.params.imageId
      // console.log('Going after: ' + sendParms)
      }
    return (
      <Section>
        <center><ZoomBox image={sendParms}/></center>
      </Section>
    )
  }
}
