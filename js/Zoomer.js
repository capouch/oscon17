import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'

let renderImage = function(selection) {
      // Clear out any previous contents
      ///document.getElementById("zoomer-view").innerHTML = "";
      // Set filename
      let baseName = selection + '.dzi';
      // Render viewer note nasty "node_modules" parameter!
      console.log('In the renderImage method');
      let viewer = OpenSeadragon({
        id: "zoomer-view",
        prefixUrl: "/images/",
        tileSources: baseName
      });
      console.log('I think the zoomer should be open!!');
    }
// end private members/methods

// Just one public method
let ZoomBox =  React.createClass ({
  componentDidMount: function() {
    let id = 'bremer';
    console.log("zoomer init mod");
    let url=document.URL;
    console.log('Got URL ' + url);
    let regex = /[^/]+\?show=(\w+)/
    if (url.match(regex)) {
       id = url.match(regex)[1];
       console.log('Setting new id of ' + id);
    }
    //  let id = url.match(regex)[1];
    if (id == null ) { id = 'brush'};
    console.log('Trying to render: ' + id);
    //id = 'brush';
    renderImage(id);
    console.log('Got past call to render');
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
