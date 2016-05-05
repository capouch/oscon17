import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'
import { Section } from 'neal-react'

// Function to configure and raise the OpenSeaDragon widget
const renderImage = function(selection) {

<<<<<<< HEAD
  // Task for another (near-term) time: why do I have to hardwire paths?
  const baseName =  '/home/brianc/PROJECTS/oscon16/public/' + selection + '.dzi';
  // console.log('In the renderImage method about to render ' + baseName);
  const viewer = OpenSeadragon({
    id: "zoomer-view",
    prefixUrl: "public/img-icons/",
    tileSources: baseName
  });
}
// end private members/methods

// Create a container class for the "Zoomer" component
const ZoomBox = React.createClass ({
  componentDidMount: function() {
    let zoomTarget = this.props.image;
    renderImage(zoomTarget);
  },
  render() {
    const style = {
      width: 800,
      height: 600
    };
    return (
      <div style={style} id="zoomer-view">
      </div>
    );
  }
});

// Render in a component
export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    // This is the default case, i.e. Zoomer with no parameters
    let sendParms = "/tiles/bremer";

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
    );
  }
}
