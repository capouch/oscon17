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

// Borrowed from the react-searh-bar demo
const matches = {
  'macbook a': [
    'macbook air 13 case',
    'macbook air 11 case',
    'macbook air charger'
  ],
  'macbook p': [
    'macbook pro 13 case',
    'macbook pro 15 case',
    'macbook pro charger'
  ]
}

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
    });
  },
  getInitialState: function() {
    // Should this be a call to loadRecordsFromServer?
    return {
      records: [],
      fetchURL: ""
    };
  },
  componentDidMount: function() {
    console.log('Mounting event')
    this.state.fetchURL = this.props.url;
    this.loadRecordsFromServer();
    // This polls the server; not quite sure why . . .
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  onChange(input, resolve) {
    // Currently we do not do suggestions
    },
  onSearch(input) {
    if (!input) return;
      console.info(`Searching "${input}"`);
      let searchURL = '/oscon-test?query=query+{lookup(keywords: "' +  input + '" ){title, filename, description, source, taglist}}';
      this.setState({fetchURL: searchURL}, function(){
        this.loadRecordsFromServer()
        }.bind(this));
      // console.log('State is: ' + this.state.fetchURL)
      // this.loadRecordsFromServer();
    },
  render: function() {
    return (
      <Section>
        <center><h2>Current image data</h2></center>
        <SearchBar
          placeholder="search images"
          onChange={this.onChange}
          onSearch={this.onSearch} />
        <Griddle results={this.state.records}
          columns={['title','filename', "description"]}
          columnMetadata={customColumnMetadata}
          showSettings={true}
          resultsPerPage={10}
          />
      </Section>
    )}
  });

/*
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
*/

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
