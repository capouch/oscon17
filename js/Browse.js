/*
 * spa.upload.js
 *   Handle uplads of new images
 */

import React from 'react'
import { render } from 'react-dom'
import Griddle from 'griddle-react'
import { Link } from 'react-router'
import NavLink from './NavLink'
import { Section } from 'neal-react'

// private methods

// Options for Griddle table generator
// Save this: return <a href={url}>{this.props.data}</a>
// Note that for now we just hardcode the link target in the url variable


  // 'brush' and 'bremer' below will need to come from the database soon
  let LinkComponent = React.createClass({

      render: function(){
        // Make a NavLink out of a column value
        // console.log('Processing in LinkComponent');
        let target = this.props.data,
          renderBase = "zoomer/",
          // tifRegex = /tif|png/,
          renderPath = renderBase + target;

        /* Switch image target for tiff files for variety's sake
        if (tifRegex.test(target)) {
          renderPath = renderBase + target;
        }
        */

        return <NavLink to={renderPath}>{this.props.data}</NavLink>
      }
    });


let  customColumnMetadata = [
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
let InfoTable = React.createClass({
  // IRONY: Using an AJAX call to get the GrqphQL data from server!
  loadRecordsFromServer: function() {
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
let SearchBar = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search...disabled" />
        <p>
          <input type="checkbox" />
          {' '}
          Example checkbox to implement a binary filter
        </p>
      </form>
      );
    }
  });

// end private members/methods

let Browse = React.createClass ( {
  render() {
    return (
      <div>
        <InfoTable
          url="/oscon-test?query=query+{imageRecs{_id, title, filename, description}}"/>
      </div>
    );
  }
});

export default Browse;
