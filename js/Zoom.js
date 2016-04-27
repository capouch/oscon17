import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'

// Function to configure and raise the OpenSeaDragon widget
let renderImage = function(selection) {

  // Task for another (near-term) time: why do I have to hardwire paths?
  let baseName =  '/home/brianc/PROJECTS/oscon16/public/' + selection + '.dzi';
  // console.log('In the renderImage method about to render ' + baseName);
  let viewer = OpenSeadragon({
    id: "zoomer-view",
    prefixUrl: "/home/brianc/PROJECTS/oscon16/public/images/",
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
    let sendParms = "bremer";

    // This fires when properties are sent explictly
    if ( this.props.params.imageId ) {
      // The most time-costly two dots of my life!!
      sendParms =  this.props.params.imageId
      // THERE ARE TWO ENTRY POINTS FOR THIS MODULE!!!
      }
    console.log('Sending parms of ' + sendParms);
    return (
      <div>
        <ZoomBox image={sendParms}/>
      </div>
    );
  }
}

export default Zoomer;
