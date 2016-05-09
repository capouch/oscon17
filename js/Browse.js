/*
 * spa.upload.js
 *   Handle uplads of new images
 */

import React from 'react'
import { render } from 'react-dom'
import Griddle from 'griddle-react'
import NavLink from './NavLink'
import { Section } from 'neal-react'

// CUSTOMIZATION REQUIRED HERE!!!!
// We are using a modified version of this repo yet to be merged
// See https://github.com/moimael/react-search-bar.git (update-dependencies branch)
import SearchBar from 'react-search-bar'

// Wrap an HTML button into a component
const buttonStyle = {
  margin: '10px 10px 10px 0'
}
const Button = React.createClass({
  render: function () {
    return (
      <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.props.handleClick}>{this.props.label}</button>
    )
  }
})

// A module-scoped variable!!
let queryTarget = ""

// Compose NavLink to the zoomer view for each image
const LinkComponent = React.createClass({

  render: function(){
    // Make a NavLink out of a column value
    // The rendered object is a zoomer for this image
    const target = this.props.data,
      renderBase = "zoomer/",
      renderPath = renderBase + target;

    return <NavLink to={renderPath}>
      {this.props.data}
    </NavLink>
  }
})

// Configuration object for Griddle
const customColumnMetadata = [
  {
    "columnName": "title",
    "displayName": "Image Title"
  },
  {
    "columnName": "filename",
    "displayName": "Zoomer Link",
    "customComponent": LinkComponent
  },
  {
    "columnName": "description",
    "displayName": "Description"
  }
 ]

// InfoTable wraps Griddle, SearchBar, and Button components
const InfoTable = React.createClass({
  loadRecordsFromServer: function() {
    // console.log('Called once with ' + this.state.fetchURL)
    // Note the irony of using AJAX to get GraphQL . . .
    $.ajax({
      type: "POST",
      url: this.state.fetchURL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        // console.log(JSON.stringify(data.data))
        if (data.data.imageRecs)
          this.setState({records: data.data.imageRecs})
        else
          this.setState({records: data.data.lookup})
        data.data = undefined
        localStorage.setItem('browse', JSON.stringify(this.state))
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
    console.log('Getting state again')
    if (localStorage.getItem('browse')) {
      initValues = JSON.parse(localStorage.getItem('browse'))
      }
    console.log('Init values ' + JSON.stringify(initValues))
    return initValues;
  },
  componentDidMount: function() {
    console.log('Mounting event')
    queryTarget = this.state.fetchURL
    this.state.fetchURL = this.props.url
    // console.log('Query target before:' + queryTarget)
    // Strip off URL prefix
    // Note should we do something if it can't find the '?'
    if (queryTarget.indexOf('?')) {
      queryTarget = queryTarget.substring((queryTarget.indexOf('?')+1))
    }

    // console.log('We just set queryTarget to: ' + queryTarget)
    // console.log('State at mounting: ' + JSON.stringify(this.state))

    // If just launched get initial imageset
    if (!this.state.records || this.state.records.length == 0)
      this.loadRecordsFromServer()
  },
  componentWillUnmount: function () {
    // Keeping this around until we can test some more
    // localStorage.setItem('browse', '{}')
  },
  onSearchChange(input, resolve) {
    // Hook for "suggestions"
    },
  onSearch(input) {
    if (!input) return
    console.info(`Searching "${input}"`)
    queryTarget = 'query=query+{lookup(keywords: "' +  input + '" ){title, filename, description, source, taglist}}'
    let searchURL = '/oscon-test?' + queryTarget
    this.setState({fetchURL: searchURL}, function(){
        this.loadRecordsFromServer()
        localStorage.setItem('browse', JSON.stringify(this.state))
        }.bind(this))
    },
    handleSearchClick() {
      // console.log('Search button clicked!!')

      // This is some heavy shit going down--call new view!
      // This is the slideshow for only the images currently selected
      history.pushState(null, null, '/slides/' + queryTarget)
      location.reload()
    },
    clearStore() {
      // console.log('Handling reset click')
      localStorage.removeItem('browse')
      this.state.fetchURL = this.props.url
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
            handleClick={this.handleSearchClick}
          />
          <Button
            label="Reset search"
            handleClick={this.clearStore}
          />
        </div>
        <Griddle results={this.state.records}
          columns={['title','filename', "description"]}
          columnMetadata={customColumnMetadata}
          showSettings={true}
          resultsPerPage={10}
          />
      </Section>
    )}
  })

// Render composite component 
export default React.createClass ( {
  render() {
    return (
      <div>
        <InfoTable
          url="/oscon-test?query=query+{imageRecs{_id, title, filename, description}}"/>
      </div>
    )
  }
})
