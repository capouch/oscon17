import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'
import { Section } from 'neal-react'

// Function to configure and raise the OpenSeaDragon widget
let renderImage = function(selection) {

<<<<<<< HEAD
  // Task for another (near-term) time: why do I have to hardwire paths?
  let baseName =  '/home/brianc/PROJECTS/oscon16/public/' + selection + '.dzi';
  // console.log('In the renderImage method about to render ' + baseName);
  let viewer = OpenSeadragon({
    id: "zoomer-view",
    prefixUrl: "/home/brianc/PROJECTS/oscon16/public/images/",
=======
  let baseName = selection + '.dzi';
  console.log('In the renderImage method about to render ' + baseName);
  let viewer = OpenSeadragon({
    id: "zoomer-view",
    prefixUrl: "/img-icons/",
>>>>>>> master
    tileSources: baseName
  });
}
// end private members/methods

// Create a container class for the "Zoomer" component
let ZoomBox =  React.createClass ({
  componentDidMount: function() {
    let zoomTarget = this.props.image;
    renderImage(zoomTarget);
  },
  render() {
    let style = {
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
class Zoomer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    // This is the default case, i.e. Zoomer with no parameters
    let sendParms = "../tiles/bremer";

    // This fires when properties are sent explictly
    if ( this.props.params.imageId ) {
      // The most time-costly two dots of my life!!
      sendParms =  this.props.params.imageId
      // THERE ARE TWO ENTRY POINTS FOR THIS MODULE!!!
<<<<<<< HEAD
=======
      sendParms = '../tiles/' + this.props.params.imageId
      console.log('Going after: ' + sendParms);
>>>>>>> master
      }
    console.log('Sending parms of ' + sendParms);
    return (
      <Section>
        <center><ZoomBox image={sendParms}/></center>
      </Section>
    );
  }
}

export default Zoomer;
