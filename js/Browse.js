/*
 * spa.upload.js
 *   Handle uplads of new images
 */

import React from 'react'
import { render } from 'react-dom'
import NavLink from './NavLink'
import Griddle from 'griddle-react'

// private methods

// Options for Griddle table generator
// Save this: return <a href={url}>{this.props.data}</a>
// We use a NavLink but can't seem to customize the "query" property!!!

let LinkComponent = React.createClass({
    render: function(){
      // Set .tif files to one URL, all others to another . .
      let target = this.props.data,
        urlParms = {show: "brush"},
        tifRegex = /tif/;

      if (tifRegex.test(target)) {
        urlParms.show = "bremer";
      }

      let tryThisDInDesperation = JSON.stringify(urlParms);

      return <NavLink to={{ pathname: 'zoomer', query: { show: "brush" } }} className="nav-link">{this.props.data}</NavLink>
    }
  });


let  customColumnMetadata = [
  {
    "columnName": "title",
    "displayName": "Image Title"
  },
  {
    "columnName": "filename",
    "displayName": "Filename",
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
          // console.log('Please print!! ' + JSON.stringify(data.data.imageRecs));
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
      <div>
        <center><h2>Current image data</h2></center>
        <SearchBar />
        <Griddle results={this.state.records}
          columns={['title','filename', "description"]}
          columnMetadata={customColumnMetadata}
          showSettings={true}
          />
      </div>
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

class Browse extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <InfoTable
          url="http://oscon-sb.saintjoe-cs.org:8111/oscon-test?query=query+{imageRecs{_id, title, filename, description}}"/>
      </div>
    );
  }
}

export default Browse;
