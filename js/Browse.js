/*
  ** Browse: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
 */

import React from 'react'
import NavLink from './NavLink'
import { Section } from 'neal-react'

import Griddle from 'griddle-react'

// CUSTOMIZATION NOTE:
// We are using a modified version of this repo yet to be merged
// See https://github.com/moimael/react-search-bar.git (update-dependencies branch)
import SearchBar from 'react-search-bar'

// Hey ios/old Explorer, here's the polyfill for fetch()
import 'whatwg-fetch'

//
// 1.
// Select one of the two to configure for local/cloud access
// Local assets
const assetBase = '/graphql?'
//
// Cloud assets
// OBSOLETE!!!!  Fix or remove!!!
// const assetBase = 'http://oscon.saintjoe-cs.org:2016/graphql?'

let queryTarget = "query=query+{imageRecs{_id, title, filename, description, source, taglist}}"
const queryBase = "query=query+{imageRecs{_id, title, filename, description, source, taglist}}"

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

// Compose NavLink to the zoomer view for each image
const ZoomLinkComponent = React.createClass({

  render: function(){
    // Make a NavLink out of a column value
    // Clicking brings up "Asset" view
    const target = this.props.rowData._id,
      renderBase = "/asset/",
      renderPath = renderBase + target;

    return <NavLink to={ renderPath }>
      {this.props.data}
    </NavLink>
  }
})

// Compose NavLink to edit function
const EditLinkComponent = React.createClass({

  render: function(){
    // Make a NavLink out of a column value
    // The rendered object is an icon link to edit/delete data
    const target = this.props.data,
      renderBase = "/edit/",
      renderPath = renderBase + target;

    // Only an icon!
    return <NavLink to={renderPath}>
      <span className="fa fa-pencil-square-o"></span>
    </NavLink>
  }
})

// Configuration object for Griddle
const customColumnMetadata = [
  {
    columnName: "_id",
    displayName: "",
    cssClassName: "editColumn",
    customComponent: EditLinkComponent
  },
  {
    "columnName": "title",
    "displayName": "Title",
    "customComponent": ZoomLinkComponent
  },
  {
    "columnName": "description",
    "displayName": "Description"
  }
 ]

// InfoTable wraps Griddle, SearchBar, and Button components
const InfoTable = React.createClass({
  loadRecordsFromServer: function() {
    console.log('Browse: fetching ' + URL)
    let req = new Request(this.state.fetchURL, {method: 'POST', cache: 'reload'})

    // Use fetch API; -==> this needs a polyfill in iOS
    fetch(req).then(function(response) {
      return response.json()
    }).then (function(json) {
      // console.log('json object: ' + JSON.stringify(json))

      // All records or just search results? (imageRecs)
      if (json.data.imageRecs)
        this.setState({records: json.data.imageRecs})
      else
        // Search results (lookup)
        this.setState({records: json.data.lookup})

      // Reset record and cache returned data
      json.data = undefined
      sessionStorage.setItem('browse', JSON.stringify(this.state))
    }.bind(this))
  },
  getInitialState: function() {
    let initValues = {
      records: [],
      fetchURL: ""
    }

    // Pre-load records[] object array from sessionStorage
    // console.log('Checking session storage in initial state')
    if (sessionStorage.getItem('browse') != null) {
      initValues = JSON.parse(sessionStorage.getItem('browse'))
      }
    return initValues;
  },
  componentDidMount: function() {
    // console.log('Mounting event')

    // Extract query part only of URL (i.e. the part after the '?')
    queryTarget = this.state.fetchURL.substring(this.state.fetchURL.indexOf('?')+1)

    // Async note:
    this.setState( {fetchURL: this.props.url}, function() {
      //the conditional data fetch here is in a CALLBACK
      if ((this.state.records == null) || this.state.records.length == 0)
        this.loadRecordsFromServer()
      })
    },
  componentWillUnmount: function () {
    // Unused but reserved
  },
  onSearchChange(input, resolve) {
    // Hook for "suggestions"
    },
  onSearch(input) {
    if (!input) return
    // console.info(`Searching "${input}"`)
    queryTarget = 'query=query+{lookup(keywords: "' +  input + '" ){_id, title, filename, description, source, taglist}}'

    // 2.
    // Local assets
    let searchURL = assetBase + queryTarget
    // Cloud assets
    // ALSO OUTDATED
    // let searchURL = 'http://oscon.saintjoe-cs.org:2016/graphql?' + queryTarget

    // Callback fires when this.state object has been updated
    this.setState({fetchURL: searchURL}, function(){
        this.loadRecordsFromServer()
        sessionStorage.setItem('browse', JSON.stringify(this.state))
        }.bind(this))
    },
    // This is the very heavy moment we switch to a new view
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
          <center>
            <h2>
              Current image data
            </h2>
          </center>
          <SearchBar
            autoFocus={false}
            placeholder={"Search image database"}
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
          <Griddle
            results={this.state.records}
            columns={['_id','title', "description"]}
            columnMetadata={customColumnMetadata}
            showSettings={true}
            resultsPerPage={10}
            />
        </Section>
      )}
  })


// Here is the key to allowing a click to cause a view change
// I do not understand it well
InfoTable.contextTypes = {
  router: React.PropTypes.object.isRequired
  }


// Render composite component
export default React.createClass ( {
  render() {
    return (
      <div>
        <InfoTable
          url={ assetBase + queryBase }
          />
      </div>
    )
  }
})
