/*
  ** Edit: Provide facility for editing/deleting main image records
*/

import React from 'react'
import { Section } from 'neal-react'
import InfoFields from './InfoFields'
import Confirmation from './Confirmation'

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

// This component is something of a love child of the Browse and Upload views
const EditDeleteWidget = React.createClass({
  loadRecordsFromServer: function() {
    // Fix me: hardcoded URL won't work if we aim at the cloud!!
    let URL = 'http://127.0.0.1:2016/oscon-test?query=query+{imageRec(id: "' + this.props.record + '"){_id, title, filename, description, source, taglist}}',
      req = new Request(URL, {method: 'POST', cache: 'reload'})
    fetch(req).then(function(response) {
      return response.json()
    }).then (function(json) {
      // console.log('json object: ' + JSON.stringify(json))
      this.setState({record: json.data.imageRec})
    }.bind(this))
  },
  getInitialState: function() {
    return {
      step: 1
    }
  },
  nextStep: function() {
    this.setState({
      step : this.state.step + 1
    })
  },
  componentDidMount: function() {
    // console.log('Mounting event')
    // console.log(this.state.record)

    // Extract query part only of URL (i.e. the part after the '?')
    let queryTarget = "";

    // console.log('State at mounting: ' + JSON.stringify(this.state))
    this.loadRecordsFromServer()
  },
  saveValues: function(fields) {
    return function() {
      // Callback function for InfoFields sub-module
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      fieldValues = Object.assign({}, fieldValues, fields)
      fieldValues.filename = serverFilename

      // Clear out cached data in local store
      sessionStorage.removeItem('browse')

      // Put together (awful-looking) query URL
      let queryURL="/oscon-test?query=mutation+{updateImage(data: { _id: " + JSON.stringify(id) + ", title: " + JSON.stringify(fieldValues.title) +
      ",description: " + JSON.stringify(fieldValues.description) + ", filename: " + JSON.stringify(fieldValues.filename)
      +", source: " + JSON.stringify(fieldValues.source) + ", taglist: " + JSON.stringify(fieldValues.taglist)+ "})}"
      // console.log('Sending: ' + queryURL)
      // I don't think this is needed in this view
      // Reset the field values here!!
      // fieldValues = Object.assign({}, fieldValues, blankFieldValues)
      $.ajax({
        type: "POST",
        url: queryURL,
        dataType: 'json',
        cache: false,
        success: function(data) {
          // console.log('Returned from mutation call')
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }.bind(this)
      })
    }()
  },
  render: function() {
    // console.log('rendering widget')
    switch(this.state.step) {
      case 1:
      if (!this.state.record) {
        // Data is not ready yet
        console.log('I thought promises fixed this!!')
        return (
          <div> Waiting </div>
        )
      }
      else {
        // console.log(JSON.stringify(this.state))

        // Note: async strangeness possible here . .
        //  i.e. could data possibly still not be ready yet?
        fieldValues.title = this.state.record.title
        fieldValues.description = this.state.record.description
        fieldValues.source = this.state.record.source
        fieldValues.taglist = this.state.record.taglist
        id = this.state.record._id
        serverFilename = this.state.record.filename
        return (
          <div>
            <Section>
              <center>
                <h2>
                  Edit image record values
                </h2>
              </center>
              <InfoFields
                fieldValues={fieldValues}
                nextStep={this.nextStep}
                saveValues={this.saveValues} />
            </Section>
          </div>
        )
      }
      case 2:
      return <Confirmation />
    }
  }
})

// Render component
export default React.createClass ( {
  render() {
    // console.log('rendering main class')
    return (
      <div>
        <EditDeleteWidget record={this.props.params.imageId}/>
      </div>
    )
  }
})
