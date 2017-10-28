/*
  ** Browse: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
 */

import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Section } from 'neal-react'

import Griddle, {RowDefinition, ColumnDefinition, plugins} from 'griddle-react'
import { connect } from 'react-redux'

// CUSTOMIZATION NOTE:
// We are using a modified version of this repo yet to be merged
// See https://github.com/moimael/react-search-bar.git (update-dependencies branch)
// import SearchBar from '../my_modules/react-search-bar'
// import sbStyles from '../public/css/searchbar.css'

import SearchBar from 'react-search-bar'
import searchStyles from '../public/css/searchbar.css'

// Hey ios/old Explorer, here's the polyfill for fetch()
import 'whatwg-fetch'

//
// 1.
// Select one of the two to configure for local/cloud access
// Local assets
const assetBase = '/graphql?'
//
// Cloud assets
// const assetBase = 'http://www.scene-history.org/graphql?'

let queryTarget = "query=query+{imageRecs{_id, title, filename, description, source, taglist}}"
const queryBase = "query=query+{imageRecs{_id, title, filename, description, source, taglist}}"

// Working to figure out griddle-react 1.0 components
// Thank God for https://griddlegriddle.github.io/Griddle/examples/getDataFromRowIntoCell/

// Get all the data for this row
const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

// Actually put it into the rowData object
const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into AssetLinkComponent
    rowData: rowDataSelector(state, props)
  };
});

// Use rowData _id in title column
function AssetLinkComponent({ value, griddleKey, rowData }) {
  const renderBase = "/asset/"
  let target = rowData._id
  let renderPath = renderBase + target;

    return <NavLink to={ renderPath } >
        { value }
      </NavLink>
  }

// Generate pencil icon link to edit
const EditLinkComponent = function({ value }) {
  let target = { value }
  const renderBase = "/edit/"
  target = target.value
  let renderPath = renderBase + target

  // Only an icon!
  return <NavLink to={renderPath}>
    <span className="fa fa-pencil-square-o"></span>
  </NavLink>
}

// We also do not want a filter--it messes with the search function
const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <div>
    <SettingsWrapper />
    <Table />
    <Pagination />
  </div>
)
/* ** End of Griddle-related code ** */

// Wrap an HTML button into a component
const buttonStyle = {
  margin: '10px 10px 10px 0'
}

class Button extends React.Component {
  render() {
    return (
      <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.props.handleClick}>{this.props.label}</button>
    )
  }
}

// InfoTable wraps Griddle, SearchBar, and Button components

class InfoTable extends React.Component {

  constructor(props) {
    super(props);
    if (sessionStorage.getItem('browse') != null) {
      this.state = JSON.parse(sessionStorage.getItem('browse'))
      return
    }
    this.state = {
      records:[],
      fetchURL: "",
      currentPage: 1
    }
  }

  loadRecordsFromServer() {
    // console.log('Browse: fetching ' + this.state.fetchURL)
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
  }

  componentDidMount() {
    // console.log('Infotable history: ' + JSON.stringify(this.props.history))
    // console.log('Infotable state: ' + JSON.stringify(this.state))

    // Extract query part only of URL (i.e. the part after the '?')
    queryTarget = this.state.fetchURL.substring(this.state.fetchURL.indexOf('?')+1)

    // Async note:
    this.setState( {fetchURL: this.props.url}, function() {
      //the conditional data fetch here is in a CALLBACK
      if ((this.state.records == null) || this.state.records.length == 0) {
      // console.log('Fetching from mount')
        this.loadRecordsFromServer()
      }
      })
    }

  componentWillUnmount() {
    // Need to remember which page we're on before leaving
    sessionStorage.setItem('browse', JSON.stringify(this.state))
  }

  onSearchChange(input) {
    // Hook for "suggestions"
    }

  onSearch = (input) => {
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
      // console.log('Fetching from search')
        this.loadRecordsFromServer()
        sessionStorage.setItem('browse', JSON.stringify(this.state))
        }.bind(this))
    }

    // This is the very heavy moment we switch to a new view
    handleCustomSlideshowClick = () => {
      this.props.history.push('/slides/' + queryTarget)
      // this.context.router.push('/slides/' + queryTarget)
    }

    clearStore = () => {
      // console.log('Handling reset click')
      sessionStorage.removeItem('browse')
      this.setState({placeholder: "", value: ""})
      queryTarget = queryBase
      this.state.fetchURL = assetBase + queryTarget
      // console.log('Fetching from clear')
      this.loadRecordsFromServer()
    }

    // Functions to remember current page across mounts
    _onNext = () => {
      let thisPage = this.state.currentPage + 1
      this.setState( { currentPage: thisPage} )
    }

    _onClear = () => {
      // Long story, we don't use this Functions
      // But it's required . . .
      return
    }

    _onPrevious = () => {
      let thisPage = this.state.currentPage
      // This protection shouldn't be necessary . . .
      thisPage = (thisPage == 1)?1:--thisPage
      this.setState( { currentPage: thisPage} )
      }

    suggestionRenderer(suggestion, searchTerm) {
      // This code isn't used (yet)
      return (
        <span>
          <span>{searchTerm}</span>
          <strong>{suggestion.substr(searchTerm.length)}</strong>
        </span>
      );
    }

    render() {
      return (
        <Section>
          <center>
            <h2>
              Current image data
            </h2>
          </center>
            <SearchBar
              renderSearchButton
              renderClearButton={false}
              autoFocus={false}
              placeholder={"Search image database"}
              onClear = {this._onClear}
              onChange={this.onSearchChange}
              suggestions={[]}
              suggestionRenderer={this.suggestionRenderer}
              styles={searchStyles}
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
            data={this.state.records}
            plugins={[plugins.LocalPlugin]}
            events={{
              onNext: this._onNext,
              onPrevious: this._onPrevious,
                }}
            components={{
              Layout: NewLayout
                }}
            pageProperties={{
              currentPage: this.state.currentPage,
              pageSize: 15,
            }} >
            <RowDefinition>
              <ColumnDefinition id="_id" title="*" customComponent={ EditLinkComponent } />
              <ColumnDefinition id="title" title="Title" customComponent={ enhancedWithRowData(AssetLinkComponent) }/>
              <ColumnDefinition id="description" title="Description" />
            </RowDefinition>
          </Griddle>
        </Section>
      )}
  }


// Here is the key to allowing a click to cause a view change
// I do not understand it well
InfoTable.contextTypes = {
  router: PropTypes.object.isRequired
  }


// Render composite component
export default class extends React.Component {
  contextTypes: {
   router: PropTypes.func.isRequired
  }

  render() {
    // console.log('Browse props entry: ' + JSON.stringify(this.props))
    // console.log('Browse context: ' + JSON.stringify(this.context))
    return (
      <div>
        <InfoTable
          history = { this.props.history }
          url={ assetBase + queryBase }
          />
      </div>
    )
  }
}
