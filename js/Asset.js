/* Asset.js: Render a single image and display its associated data
  Brian Capouch begun 10 December 2016
  React 16 conversion 12 Dec 2019!!
*/

import React from 'react'
import { Section } from 'neal-react'

export default class extends React.Component {

  imageClick(event) {
    // Clicking image will take user to Zoomer view
    // See http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    // console.log("Asset props: ", JSON.stringify(this.props))
    console.log("About to head to zoomer ", this.state.displayFields.filename)
    this.props.history.push('/zoomer/' + this.state.displayFields.filename)
  }


  constructor(props){
        super(props)
        if (sessionStorage.getItem('browse') != null) {
          let initValues = JSON.parse(sessionStorage.getItem('browse'))
          console.log('In constructor with ', initValues, " and ", props)
          var myRecords = initValues.records
        } else
        {
          // We'll have to lookup record from DB
        }
        this.imageClick = this.imageClick.bind(this);
        console.log('Asset: ', JSON.stringify(this.props))
        const record = this.props.match.params.imageId,
          desiredRecord = myRecords.find(function (d){
            return d._id == record
          })


          // Put together fields required for view
          var displayRecord = {
            filename: desiredRecord["filename"],
            // Construct path to 1k image
            imageURL: "/images/" + desiredRecord["filename"] + "-1k",
            title: desiredRecord["title"],
            description: desiredRecord["description"],
            source: desiredRecord["source"],
            tags: desiredRecord["taglist"]
            }
          this.state = {
              records: myRecords,
              displayFields: displayRecord
          }
    }

  /*
  componentWillMount() {
    // Set up various fields for display
    console.log('Asset: ', JSON.stringify(this.props))
    const record = this.props.match.params.imageId,
      desiredRecord = this.state.records.find(function (d){
        return d._id == record
      })


      // Put together fields required for view
      var displayRecord = {
        filename: desiredRecord["filename"],
        // Construct path to 1k image
        imageURL: "/images/" + desiredRecord["filename"] + "-1k",
        title: desiredRecord["title"],
        description: desiredRecord["description"],
        source: desiredRecord["source"],
        tags: desiredRecord["taglist"]
        }
    this.setState({ displayFields: displayRecord })
  }
  */

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
}
