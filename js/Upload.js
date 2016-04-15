/*
 * spa.upload.js
 *   Handle uplads of new images
 */

'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import DropZoneComponent from 'react-dropzone-component'

  // begin local variables
let
  // Configuration and setup for DropZoneComponent
  componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif', 'tif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler/'
  },
  eventHandlers = {
    // This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: null,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecomplete: null
    },
    djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif,image/tiff"
    };

  class Upload extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
        <DropZoneComponent  config={componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig} />,
        </div>
      );
    }
  }

  export default Upload;

// end local variables

/* export class Page extends React.Component {

  render() {
    return <div className="neal-page">{this.props.children}</div>;
  }

}
*/

// public method
/*
export default function uploadInitModule ( $container ) {

  console.log("upload module reached");
  // This constitutes the whole view to the user, so far
  ReactDOM.render(
    <DropZoneComponent  config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />,
    document.getElementById('upload-view')
    );

  // console.log("upload initModule over");
  };
  */
