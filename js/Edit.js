/*
  ** Edit: Provide facility for editing/deleting main image records
*/

import React from 'react'
import { Section } from 'neal-react'
import InfoFields from './InfoFields'
import Confirmation from './Confirmation'
import PropTypes from 'prop-types'

// fieldValues provide form input
let fieldValues = {
  title : null,
  description : null,
  source : null,
  taglist : null
}

// Module "globals"
let id = '',
  serverFilename = ''

// This component is something of a love child between Browse and Upload
class EditDeleteWidget extends React.Component {
  constructor(props) {
    super(props)
    console.log("Lets look at props ", props)
    this.state = {
      isLoggedIn: this.checkSignedInWithMessage(),
      step: 1
    }
    // This is definitely going to have to be fixed!!
    // this.onAuthStateChanged = this.onAuthStateChanged.bind(this)
    //this.loadRecordsFromServer = this.loadRecordsFromServer.bind(this)
    //this.nextStep = this.nextStep.bind(this)
    //this.resetStep = this.resetStep.bind(this)
  }

  componentDidMount() {
    console.log('Mounting event')
    // console.log(this.state.record)

    // Extract query part only of URL (i.e. the part after the '?')
    let queryTarget = "";
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    this.loadRecordsFromServer()
  }

/*
  onAuthStateChanged(user) {
     if (user) {
       console.log("point one")
       this.setState( {
         isLoggedIn: true,
       })
     }
     else {
       console.log("Point two")
       this.setState( {
         isLoggedIn: false,
       })
     }
   }
   */
   onAuthStateChanged = (user) => {
     if (user) {
       console.log("point one")
       this.setState( {
         isLoggedIn: true,
       })
     }
     else {
       console.log("Point two")
       this.setState( {
         isLoggedIn: false,
       })
     }
   }

  checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    return firebase.auth().currentUser;
  }

  loadRecordsFromServer = () => {
    let URL = '/graphql?query=query+{imageRec(id: "' + this.props.record + '"){_id, title, filename, description, source, taglist}}',
      req = new Request(URL, {method: 'POST', cache: 'reload'})
    // console.log('Fetch URL: ' + URL)
    fetch(req).then(function(response) {
      return response.json()
    }).then (function(json) {
      // console.log('json object: ' + JSON.stringify(json))
      this.setState({record: json.data.imageRec})
    }.bind(this))
  }

  nextStep = () => {
    this.setState({
      step : this.state.step + 1
    })
  }

  // Now superfluous 3/4/17
  resetStep = () => {
    // See you later; when edit finishes go to Browse view
    this.context.router.push('/browse')
  }

  saveValues(fields) {
      // Callback function for InfoFields sub-module
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      fieldValues = Object.assign({}, fieldValues, fields)
      fieldValues.filename = serverFilename

      // Clear out cached data in local store
      sessionStorage.removeItem('browse')

      // Put together (awful-looking) query URL
      let URL="/graphql?query=mutation+{updateImage(data: { _id: " + JSON.stringify(id) + ", title: " + JSON.stringify(fieldValues.title) +
      ",description: " + JSON.stringify(fieldValues.description) + ", filename: " + JSON.stringify(fieldValues.filename)
      +", source: " + JSON.stringify(fieldValues.source) + ", taglist: " + JSON.stringify(fieldValues.taglist)+ "})}",
        req = new Request(URL, {method: 'POST', cache: 'reload'})
      // console.log('Sending: ' + URL)
      fetch(req).then(function(response) {
        return response.json()
      }.bind(this))
  }

  deleteRecord() {
      // Callback to remove an image record in the DB

      // Clear out cached data in local store
      sessionStorage.removeItem('browse')

      // Put together mutation URL
      let URL="/graphql?query=mutation+{deleteImage(id: " + JSON.stringify(id) + ")}",
        req = new Request(URL, {method: 'POST', cache: 'reload'})
      console.log('Sending: ' + URL)
      fetch(req).then(function(response) {
        return response.json()
      }.bind(this))
      // Mongod record is now gone; the saved original file + 2 created files
      //  still will need to be deleted on the Server
      //  How to do that??!!!???
  }

  render() {
    // console.log('rendering widget')
    switch(this.state.step) {
      case 1:
      if (this.checkSignedInWithMessage()) {
        // Only allow editing when there is a valid logged-in user
        if (!this.state.record) {
          // Data is not ready yet
          return (
            // This causes the screen to flash!!
            <div> Waiting </div>
          )
        }
        else {
          // console.log(JSON.stringify(this.state))
          // Note: async strangeness possible here . . ??
          fieldValues.title = this.state.record.title
          fieldValues.description = this.state.record.description
          fieldValues.source = this.state.record.source
          fieldValues.taglist = this.state.record.taglist
          // These next two are not subject to user editing
          id = this.state.record._id
          serverFilename = this.state.record.filename
          return (
            <div>
              <Section>
                <center>
                  <h2>
                    Edit/Delete image record values
                  </h2>
                </center>
                <InfoFields
                  fieldValues={fieldValues}
                  isCreate={false}
                  nextStep={this.nextStep}
                  saveValues={this.saveValues}
                  deleteRecord={this.deleteRecord}/>
              </Section>
            </div>
          )
        }
      } else {
        // Post message that edits are only for authorized users
        return (
          <Section>
            <div>
              <center>
                <h2>
                  You must be logged in to Edit
                </h2>
              </center>
            </div>
          </Section>
        )
      }
      case 2:
      console.log('Edit resetStep ' + this.resetStep)
      return (
        <Confirmation resetStep={this.resetStep} />
        )
    }
  }
}

// Attach the router to the widget's context so we can jump out
EditDeleteWidget.contextTypes = {
  router: PropTypes.object.isRequired
  }

// Render component
export default class extends React.Component {
  render() {
    // console.log('Edit props ' + JSON.stringify(this.props))
    // console.log('Edit context ' + JSON.stringify(this.context))
    return (
      <div>
        <EditDeleteWidget record={this.props.match.params.imageId}/>
      </div>
    )
  }
}
