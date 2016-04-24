/*
 * spa.upload.js
 *   Handle uplads of new images
 */

'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import DropZoneComponent from 'react-dropzone-component'
import InfoFields from './InfoFields'
//import Confirmation from './Confirmation'

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
    success: function(file, response) {
      console.log('Got ' + response);
      fieldValues.filename = response;
    },
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

// Data structure

let fieldValues = {
  title : null,
  description : null,
  filename : null,
  source : null,
  taglist : null
}

let Upload = React.createClass ( {
 getInitialState: function() {
   return {
    step : 2
  }
 },
 saveValues: function(fields) {
  return function() {
    // Remember, `fieldValues` is set at the top of this file, we are simply appending
    // to and overriding keys in `fieldValues` with the `fields` with Object.assign
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    fieldValues = Object.assign({}, fieldValues, fields)
    console.log('Retrieved: ' + JSON.stringify(fields));
  }()
 },
 nextStep: function() {
  this.setState({
    step : this.state.step + 1
    })
 },
 // Same as nextStep, but decrementing
 previousStep: function() {
  this.setState({
    step : this.state.step - 1
    })
 },
 render: function() {
   switch(this.state.step) {
     case 1:
      return <DropZone />
     case 2:
      return (
        <div>
        <DropZoneComponent config={componentConfig}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig} />
        <InfoFields
          fieldValues={fieldValues}
          nextStep={this.nextStep}
          saveValues={this.saveValues} />
        </div>
      )
  case 3:
    return <Confirmation />
  }
 }
});

export default Upload