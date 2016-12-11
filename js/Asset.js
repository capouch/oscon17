/* Asset.js: Render a single image and display its associated data
  Brian Capouch begun 10 December 2016
*/

import React from 'react'
import { Section } from 'neal-react'
import NavLink from './NavLink'

// For "goto" purposes
import { browserHistory } from 'react-router/es'

const record = null

export default React.createClass ( {

  imageClick(event) {
    // Clicking image will take user to Zoomer view
    // See http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router

    browserHistory.push('/zoomer/' + this.state.fileName)
    // console.log('Nothing happened!!')
  },

  getInitialState: function() {
    let initValues = {
      records: [],
    }
    // This should always return something at the level we're working at here
    // But this is a note to ponder whether you need to cover things if not
    if (sessionStorage.getItem('browse') != null) {
      initValues = JSON.parse(sessionStorage.getItem('browse'))
      }
    return initValues;
  },

  render() {
    // For readability: get the desired record from params
    const record = this.props.params.imageId,

    // Get the data from the session cache
    targetRecord = this.state.records.find(function (d){
      return d._id == record
    }),

    // Set up path to 1k rendering of image
    fileName = targetRecord["filename"],
    imageURL = "/images/" + fileName + "-1k",

    // Extract fields to print
    title = targetRecord["title"],
    description = targetRecord["description"],
    source = targetRecord["source"]
    this.setState({ fileName: fileName })

    return (
      <Section>
        <div>
          <h4>Click on image for zoomed view</h4>
            <img src={imageURL} onClick={this.imageClick}/>
          <h5>
            <b>Title:</b> { title }
          </h5>
          <h5>
            <b>Description:</b> { description }
          </h5>
          <h5>
            <b>Source:</b> { source }
          </h5>
        </div>
      </Section>
  )}
})
