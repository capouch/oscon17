/*
  ** Zoom: Wrap the OpenSeaDragon client in a React component
    The functionality provided by this module was the inspiration for the app
 */

import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'
import { Section } from 'neal-react'
//require('electron-window').parseArgs();
// import { parseArgs } from 'electron-window'
// import { remote } from '../electron'


/*
  var remote = require('electron').remote;
  console.log('<p>filePath: ' + remote.getGlobal('sharedObj').filePath + '</p>');
*/

// Do we have access to global "remote"
// console.log(remote.getGlobal('sharedObj').filePath);


// Function to configure and raise the OpenSeaDragon widget
const renderImage = function(selection) {
  // console.log(remote.getGlobal('sharedObj').filePath);
  // For now use global object to determine base file path

  // const filePrefix = remote.getGlobal('sharedObj').filePath + '/public/';
  // const filePrefix = '/home/brianc/PROJECTS/oscon16/public/';

  // We pass in the base dir path via electron-window
  // This block used when images/DB comes from local server
  // const filePrefix = window.__args__.baseDir + '/public/';
  // console.log('File prefix: ' + filePrefix);


  // 1.
  // Use cloud-based image assets
  const assetBase ="http://oscon.saintjoe-cs.org:2016/"
  //
  // Use local assets
  // const assetBase = ''

  const baseName = assetBase + selection + '.dzi'
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

    // This module has two routes, and thus two entry points
    // The default case, i.e. Zoomer with no parameters
    let sendParms = "../tiles/bremer"

    // This fires when properties are sent explictly
    if ( this.props.params.imageId ) {
      // The most time-costly two dots of my life!!
      sendParms = '/tiles/' + this.props.params.imageId
      // console.log('Going after: ' + sendParms);
      }
    console.log('Sending parms of ' + sendParms);
    return (
      <Section>
        <center><ZoomBox image={sendParms}/></center>
      </Section>
    )
  }
}
