import OpenSeaDragon from 'openseadragon'
import React from 'react'
import ReactDOM from 'react-dom'

let renderImage = function(selection) {
      // Clear out any previous contents
      ///document.getElementById("zoomer-view").innerHTML = "";
      // Set filename
      let baseName = selection + '.dzi';
      // Render viewer note nasty "node_modules" parameter!
      let viewer = OpenSeadragon({
        id: "zoomer-view",
        prefixUrl: "./node_modules/openseadragon/build/openseadragon/images/",
        tileSources: baseName
      });
    }
// end private members/methods

// public methods
export default function zoomerInitModule ( path ) {
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
  //id = 'brush';
  renderImage(id);
}
