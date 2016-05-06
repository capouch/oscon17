/*
 * spa.upload.js
 *   Handle uplads of new images
 */

import React from 'react'
import { render } from 'react-dom'
import Griddle from 'griddle-react'
import NavLink from './NavLink'
import { Section } from 'neal-react'

// private methods

// Options for Griddle table generator
// Save this: return <a href={url}>{this.props.data}</a>
// Note that for now we just hardcode the link target in the url variable


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
});


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
 ];

// We have hijacked this component and patched in Griddle
const InfoTable = React.createClass({
  // IRONY: Using an AJAX call to get the GrqphQL data from server!
  loadRecordsFromServer: function() {

    // Good ole jQuery!
    // Note the irony of using AJAX to get GraphQL . . .
    $.ajax({
      type: "POST",
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        // console.log('Making a server trip!!!! ' + JSON.stringify(data.data.imageRecs));
        this.setState({records: data.data.imageRecs});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    // Should this be a call to loadRecordsFromServer?
    return {records: []};
  },
  componentDidMount: function() {
    this.loadRecordsFromServer();
    // This polls the server; not quite sure why . . .
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <Section>
        <center><h2>Current image data</h2></center>
        <SearchBar />
        <Griddle results={this.state.records}
          columns={['title','filename', "description"]}
          columnMetadata={customColumnMetadata}
          showSettings={true}
          resultsPerPage={10}
          />
      </Section>
    )}
  });

// Currently doesn't do anything
// See https://github.com/vakhtang/react-search-bar for an idea
const SearchBar = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" ref="searchString" placeholder="Search...disabled" />
        <p>
          <input ref = "searchBoolean" type="checkbox" />
          {' '}
          Example checkbox to implement a binary filter
        </p>
      </form>
      );
    }
  });

// end private members/methods

export default React.createClass ( {
  render() {
    return (
      <div>
        <InfoTable
          url="/oscon-test?query=query+{imageRecs{_id, title, filename, description}}"/>
      </div>
    );
  }
});
