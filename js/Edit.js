/*
  ** Edit: Provide facility for editing/deleting main image records
*/

import React from 'react'
import { Section } from 'neal-react'

// Added as a template of sorts from the Merge view
const EditDeleteWidget = React.createClass({
  loadRecordsFromServer: function() {
    // console.log('Browse once with ' + this.state.fetchURL)
    // Note the irony of using AJAX to get GraphQL . . .
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:2016/oscon-test?query=query+{imageRec(id: "' + this.props.record + '"){title, filename, description, taglist}}',
      dataType: 'json',
      cache: false,
      success: function(data) {
        // Is the data from a "fetch all" query, or a lookup search?
        if (data.data.imageRec)
          this.setState({record: data.data.imageRec})
        else
          this.setState({record: data.data.lookup})
        // data.data = undefined
        // sessionStorage.setItem('browse', JSON.stringify(this.state))
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.state.url, status, err.toString());
        }.bind(this)
      })
  },
  getInitialState: function() {
    let initValues = {
      record: [],
      fetchURL: ""
    }
  return initValues
  },
  componentDidMount: function() {
    // console.log('Mounting event')

    // Extract query part only of URL (i.e. the part after the '?')
    let queryTarget = "";

    // console.log('State at mounting: ' + JSON.stringify(this.state))

    // If just launched get initial imageset
    if ((this.state.record == null) || this.state.record.length == 0)
      this.loadRecordsFromServer()
    },
  componentWillUnmount: function () {
    // Unused but reserved
  },
  onSearchChange(input, resolve) {
    // Hook for "suggestions"
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
    let tempOutputString = JSON.stringify(this.state.record)
    return (
      <Section>
        <center><h2>Eventual edit widget placeholder</h2>
          <h3>{tempOutputString}</h3>
        </center>
      </Section>
    )}
  })

// Render component
export default React.createClass ( {
  render() {
    return (
      <div>
        <EditDeleteWidget record={this.props.params.imageId}/>
      </div>
    )
  }
})
