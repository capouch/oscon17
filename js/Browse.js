/*
 * spa.upload.js
 *   Handle uplads of new images
 */

import React from 'react'
import { render } from 'react-dom'
import Griddle from 'griddle-react'
import NavLink from './NavLink'
import { Section } from 'neal-react'

// We are using a modified version of this repo yet to be merged
// See https://github.com/moimael/react-search-bar.git (update-dependencies branch)
import SearchBar from 'react-search-bar'

// private methods

// Options for Griddle table generator
// Save this: return <a href={url}>{this.props.data}</a>
// Note that for now we just hardcode the link target in the url variable

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
    // console.log('Processing in LinkComponent');
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
  // IRONY: Using an AJAX call to get the GrqphQL data from server!
  loadRecordsFromServer: function() {
    // console.log('Called once with ' + this.state.fetchURL)
    // Good ole jQuery!
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
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    })
  },
  getInitialState: function() {
    // Should this be a call to loadRecordsFromServer?
    return {
      records: [],
      fetchURL: "",
    }
  },
  componentDidMount: function() {
    console.log('Mounting event')
    this.state.fetchURL = this.props.url
    this.loadRecordsFromServer()
  },
  onChange(input, resolve) {
    // Here is where to put code which implements suggestions in the SearchBar
    },
  onSearch(input) {
    if (!input) return
    console.info(`Searching "${input}"`)
    queryTarget = 'query=query+{lookup(keywords: "' +  input + '" ){title, filename, description, source, taglist}}'
    let searchURL = '/oscon-test?' + queryTarget
    this.setState({fetchURL: searchURL}, function(){
        this.loadRecordsFromServer()
        }.bind(this))
    },
    handleClick() {
      console.log('Button clicked!!')
      // Someone on stackoverflow called this a "violent solution"
      // The right way is to push it to the history object
      console.log('History yet?' + JSON.stringify(history))
      //this.context.transitionTo('/slides/' + queryTarget);
      history.replaceState(null, null, '/slides/' + queryTarget)
      //window.location.assign('/slides/' + queryTarget);

    },
  render: function() {
    return (
      <Section>
        <center><h2>Current image data</h2></center>
        <SearchBar
          placeholder="search images"
          onChange={this.onChange}
          onSearch={this.onSearch} />
        <Button
          label="Slideshow of this imageset"
          handleClick={this.handleClick}
        />
        <Griddle results={this.state.records}
          columns={['title','filename', "description"]}
          columnMetadata={customColumnMetadata}
          showSettings={true}
          resultsPerPage={10}
          />
      </Section>
    )}
  })

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
