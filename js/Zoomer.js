import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'

// Function to configure and raise the OpenSeaDragon widget
let renderImage = function(selection) {

  let baseName = selection + '.dzi';
  // NOTE NOTE NOTE: We are current getting images via symlink
  //  This isn't viable in the long run so this needs fixed
  console.log('In the renderImage method');
  let viewer = OpenSeadragon({
    id: "zoomer-view",
    prefixUrl: "/images/",
    tileSources: baseName
  });
}
// end private members/methods

// Create a container class for the "Zoomer" component
let ZoomBox =  React.createClass ({
  componentDidMount: function() {
    // Set default image to show
    let id = 'bremer';
    console.log("zoomer render mod live");

    // This logic will change once we have the image name in a parameter
    let url=document.URL;
    // console.log('Got URL ' + url);
    let regex = /[^/]+\?show=(\w+)/
    if (url.match(regex)) {
       id = url.match(regex)[1];
       console.log('Setting new id of ' + id);
    }
    if (id == null ) { id = 'bremer'};
    // console.log('Trying to render: ' + id);
    renderImage(id);
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
    return (
      <div>
        <ZoomBox />
      </div>
    );
  }
}

export default Zoomer;
