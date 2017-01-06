/*
 *    Upload: Hand upload of new images
 *    Input image metadata
 */

// import React from '../public//libs/react'
import React from 'react'
import DropZoneComponent from 'react-dropzone-component'
import InfoFields from './InfoFields'
import Confirmation from './Confirmation'
import { Section } from 'neal-react'

// Module-scope variables
let queryURL = "",
  serverFilename = ""

// Configuration and setup for DropZoneComponent
const componentConfig = {
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
      // This callback receives filename from the server
      // console.log('Got ' + response)
      serverFilename = response
      // Cut the quotes
      serverFilename = serverFilename.replace(/"/g,"")
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
      // Note: configure here for SINGLE file upload
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif,image/tiff",
    }


// fieldValues provide form input
let fieldValues = {
  title : null,
  description : null,
  source : null,
  taglist : null
}

// We blank fields after each data entry event
const blankFieldValues = {
  title: null,
  description: null,
  source: null,
  taglist: null
}

// Code inspired by this tutorial:
//  https://www.viget.com/articles/building-a-multi-step-registration-form-with-react
export default React.createClass ( {
 getInitialState: function() {
   // Stepping stages are overkill for this project, but intrinsically interesting
   return {
     isLoggedIn: this.checkSignedInWithMessage(),
     step : 1,
  }
 },
 componentDidMount: function() {
   // This callback seems to confuse react after the first time it's called
   firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  },
  onAuthStateChanged: function(user) {
    if (user) {
      this.setState( {
        isLoggedIn: true,
      })
    }
    else {
      this.setState( {
        isLoggedIn: false,
      })
    }
  },
 checkSignedInWithMessage: function() {
   // Return true if the user is signed in Firebase
   return firebase.auth().currentUser
 },
 saveValues: function(fields) {
    // Callback function for InfoFields sub-module
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    fieldValues = Object.assign({}, fieldValues, fields)
    fieldValues.filename = serverFilename
    // Put together (awful-looking) query URL
    let URL="/graphql?query=mutation+{addImage(data: { title: " + JSON.stringify(fieldValues.title) +
      ",description: " + JSON.stringify(fieldValues.description) + ", filename: " + JSON.stringify(fieldValues.filename)
      +", source: " + JSON.stringify(fieldValues.source) + ", taglist: " + JSON.stringify(fieldValues.taglist)+ "})}",
      req = new Request(URL, {method: 'POST', cache: 'reload'})
    console.log(queryURL)
    // Reset the field values here!!
    fieldValues = Object.assign({}, fieldValues, blankFieldValues)
    // console.log('Sending: ' + URL)
    fetch(req).then(function(response) {
      return response.json()
    })
},

nextStep: function() {
  this.setState({
    step : this.state.step + 1
    })
 },
 previousStep: function() {
  this.setState({
    step : this.state.step - 1
    })
 },
 resetStep: function() {
   this.setState( {step: 1} )
 },
 render: function() {
   // console.log('Login state: ' + JSON.stringify(this.checkSignedInWithMessage()))
   switch(this.state.step) {
     case 1:
     if (this.checkSignedInWithMessage()) {
     return (
       <Section>
         <DropZoneComponent
           config={componentConfig}
           eventHandlers={eventHandlers}
           djsConfig={djsConfig} />

         <InfoFields
           fieldValues={fieldValues}
           nextStep={this.nextStep}
           isCreate={true}
           saveValues={this.saveValues} />
       </Section>
     )
   } else {
     return (
       <Section>
        <div><center><h2>You must be logged in to Upload</h2></center></div>
       </Section>
     )
   }
     case 2:
     return <Confirmation
       resetStep={this.resetStep}/>
   }
 }
})
