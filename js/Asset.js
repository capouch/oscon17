/* Asset.js: Render a single image and display its associated data
  Brian Capouch begun 10 December 2016
*/

import React from 'react'
import { Section } from 'neal-react'

// For "goto" purposes
import  browserHistory  from 'react-history'

export default React.createClass ( {

  imageClick(event) {
    // Clicking image will take user to Zoomer view
    // See http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    console.log("Asset props: ", JSON.stringify(this.props))
    console.log('Asset history is on props: ', JSON.stringify(this.props.action))
    this.props.push('/zoomer/' + this.state.displayFields.filename)
    console.log('Asset eraseme!!')
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
  componentWillMount: function() {
    // Set up various fields for display
    console.log('Asset: ', JSON.stringify(this.props))
    const record = this.props.match.params.imageId,
      desiredRecord = this.state.records.find(function (d){
        return d._id == record
      }),

      // Put together fields required for view
      displayRecord = {
        filename: desiredRecord["filename"],
        // Construct path to 1k image
        imageURL: "/images/" + desiredRecord["filename"] + "-1k",
        title: desiredRecord["title"],
        description: desiredRecord["description"],
        source: desiredRecord["source"],
        tags: desiredRecord["taglist"]
        }
    this.setState({ displayFields: displayRecord })
  },
  render() {
    return (
      <Section>
        <div>
          <h4>Click on image for zoomed view</h4>
            <img src={this.state.displayFields.imageURL} onClick={this.imageClick}/>
          <h5>
            <b>Title:</b> { this.state.displayFields.title }
          </h5>
          <h5>
            <b>Description:</b> { this.state.displayFields.description }
          </h5>
          <h5>
            <b>Source:</b> { this.state.displayFields.source }
          </h5>
          <h5>
            <b>Taglist:</b> { this.state.displayFields.tags }
          </h5>
        </div>
      </Section>
  )}
})
