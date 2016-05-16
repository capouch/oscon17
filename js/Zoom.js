import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'
import { Section } from 'neal-react'

// Find out where we're running
const ipc = window.require('electron').ipcRenderer
let runPath = ''

ipc.send('get-app-path')
// Process update message
// This is an observer pattern
 ipc.on('got-app-path', function(app,path) {
   runPath =  path + '/public/'
   console.log('Got runpath of ' + runPath)
 })
// Function to configure and raise the OpenSeaDragon widget
const renderImage = function(selection) {

  // Use cloud-based image assets
  // const assetBase ="http://oscon.saintjoe-cs.org:2016/"
  //
  // Use local assets
  const assetBase = runPath


  const baseName = assetBase + selection + '.dzi'
  console.log('Runpath: ' + runPath)
  console.log('In the renderImage method about to render ' + baseName)
  const viewer = OpenSeadragon({
    id: "zoomer-view",
    prefixUrl: assetBase + "img-icons/",
    tileSources: baseName
  })
}

// Create a container class for the "Zoomer" component
const ZoomBox = React.createClass ({
  componentDidMount: function() {
    let zoomTarget = this.props.image
    renderImage(zoomTarget)
  },
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
})
// Render in a component
export default class UniqueNewYork extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    // This is the default case, i.e. Zoomer with no parameters
    let sendParms = "/tiles/bremer"

    // This fires when properties are sent explictly
    if ( this.props.params.imageId ) {
      // The most time-costly two dots of my life!!
      sendParms = '/tiles/' + this.props.params.imageId
      console.log('Going after: ' + sendParms);
      }
    console.log('Sending parms of ' + sendParms);
    return (
      <Section>
        <center><ZoomBox image={sendParms}/></center>
      </Section>
    )
  }
}
