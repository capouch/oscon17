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
      url: this.state.fetchURL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        // Is the data from a "fetch all" query, or a lookup search?
        if (data.data.imageRecs)
          this.setState({records: data.data.imageRecs})
        else
          this.setState({records: data.data.lookup})
        data.data = undefined
        sessionStorage.setItem('browse', JSON.stringify(this.state))
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.state.url, status, err.toString());
        }.bind(this)
      })
  },
  getInitialState: function() {
    let initValues = {
      records: [],
      fetchURL: ""
    }
  },
  componentDidMount: function() {
    // console.log('Mounting event')

    // Extract query part only of URL (i.e. the part after the '?')
    queryTarget = this.state.fetchURL.substring(this.state.fetchURL.indexOf('?')+1)

    // Initialize fetchURL from props
    this.state.fetchURL = this.props.url

    // console.log('State at mounting: ' + JSON.stringify(this.state))

    // If just launched get initial imageset
    if ((this.state.records == null) || this.state.records.length == 0)
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
        this.loadRecordsFromServer()
        sessionStorage.setItem('browse', JSON.stringify(this.state))
        }.bind(this))
    },
    // This is a very heavy moment we switch to a new view
    handleCustomSlideshowClick() {
      this.context.router.push('/slides/' + queryTarget)
    },
    clearStore() {
      // console.log('Handling reset click')
      sessionStorage.removeItem('browse')
      queryTarget = queryBase
      this.state.fetchURL = assetBase + queryTarget
      this.loadRecordsFromServer()
    },
  render: function() {
    return (
      <Section>
        <center><h2>Current image data</h2></center>
        <SearchBar
          placeholder="search images"
          onChange={this.onSearchChange}
          onSearch={this.onSearch} />
        <div>
          <Button
            label="Slideshow of this imageset"
            handleClick={this.handleCustomSlideshowClick}
          />
          <Button
            label="Reset search"
            handleClick={this.clearStore}
          />
        </div>
        <Griddle results={this.state.records}
          columns={['_id','title','filename', "description"]}
          columnMetadata={customColumnMetadata}
          showSettings={true}
          resultsPerPage={10}
          />
      </Section>
    )}
  })

// Render component
export default React.createClass ( {
  render() {
    return (
      <div>
        Coming soon!!
      </div>
    )
  }
})
