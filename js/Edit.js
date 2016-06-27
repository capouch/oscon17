/*
  ** Edit: Provide facility for editing/deleting main image records
*/

import React from 'react'
import { Section } from 'neal-react'
import InfoFields from './InfoFields'

// fieldValues provide form input
let fieldValues = {
  title : null,
  description : null,
  source : null,
  taglist : null
}

// Added as a template of sorts from the Merge view
const EditDeleteWidget = React.createClass({
  loadRecordsFromServer: function() {
    // console.log('Loading record')
    // Note the irony of using AJAX to get GraphQL . . .
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:2016/oscon-test?query=query+{imageRec(id: "' + this.props.record + '"){title, filename, description, source, taglist}}',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({record: data.data.imageRec})
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.state.url, status, err.toString());
        }.bind(this)
      })
  },
/*  getInitialState: function() {
    return {
      // Note to later self: why an array, and not an object?
      record: []
    }
  }, */
  componentDidMount: function() {
    console.log('Mounting event')
    // console.log(this.state.record)
    // Extract query part only of URL (i.e. the part after the '?')
    let queryTarget = "";

    // console.log('State at mounting: ' + JSON.stringify(this.state))
    this.loadRecordsFromServer()
    },
  onEdit(input) {
    if (!input) return
    console.info(`Searching "${input}"`)
    queryTarget = 'query=query+{lookup(keywords: "' +  input + '" ){_id, title, filename, description, source, taglist}}'

    // 2.
    // Local assets
    let searchURL = assetBase + queryTarget
    // Cloud assets
    // let searchURL = 'http://oscon.saintjoe-cs.org:2016/oscon-test?' + queryTarget

    // Callback fires when this.state object has been updated
    this.setState({fetchURL: searchURL}, function(){
      this.loadrecordFromServer()
      // sessionStorage.setItem('browse', JSON.stringify(this.state))
      }.bind(this))
    },
  render: function() {
    // console.log('rendering widget')
    if (!this.state) {
      // Data is not ready yet
      return ( <div> Waiting </div>)
    }
    else {
      // console.log(JSON.stringify(this.state))

      // Note: async strangeness possible here . .
      //  i.e. could data possibly still not be ready yet?
      fieldValues.title = this.state.record.title
      fieldValues.description = this.state.record.description
      fieldValues.source = this.state.record.source
      fieldValues.taglist = this.state.record.taglist
    return (
      <div>
        <Section>
          <center>
            <h2>
              Edit image record values
            </h2>
          </center>
          <InfoFields fieldValues={fieldValues} />
        </Section>
      </div>
    )
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
