/* Asset.js: Render a single image and display its associated data
  Brian Capouch begun 10 December 2016
*/

import React from 'react'
import { Section } from 'neal-react'

export default class extends React.Component {

  imageClick = (event) => {
    // Clicking image will take user to Zoomer view
    // See http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    // console.log("Asset props: ", JSON.stringify(this.props))
    this.props.history.push('/zoomer/' + this.state.displayFields.filename)
    console.log('Asset eraseme!!')
  }

  constructor(props) {
    super(props);
    if (sessionStorage.getItem('browse') != null) {
      this.state = JSON.parse(sessionStorage.getItem('browse'))
      return
    }
    this.state = {
      records:[],
    }
  }

  setStateAsync(state) {
    console.log('Setting state: ' + JSON.stringify(state))
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentWillMount() {
    // Set up various fields for display
    let desiredRecord
    // If nothing cached, go get the data
    if (this.state.records.length == 0) {
      let URL = '/graphql?query=query+{imageRec(id: "' + this.props.match.params.imageId + '"){_id, title, filename, description, source, taglist}}',
        req = new Request(URL, {method: 'POST', cache: 'reload'})
      // console.log('Fetch URL: ' + URL)
      const res = await fetch(req)
      const {data} = await res.json()
      // console.log('Data fetched: ' + JSON.stringify(data))
      desiredRecord = data.imageRec
      }
    else {
      const record = this.props.match.params.imageId
      desiredRecord = this.state.records.find(function (d){
          return d._id == record
        })
      }

    // Put together fields required for view
    const displayRecord = {
      filename: desiredRecord["filename"],
      // Construct path to 1k image
      imageURL: "/images/" + desiredRecord["filename"] + "-1k",
      title: desiredRecord["title"],
      description: desiredRecord["description"],
      source: desiredRecord["source"],
      tags: desiredRecord["taglist"]
      }
    // console.log("Ahead of setState: " + JSON.stringify(displayRecord))
    await this.setStateAsync({ displayFields: displayRecord })
  }

  render() {
    if (this.state.displayFields) {
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
      )
  } else {
    // I don't like doing this . . .
    return (
      <div>  . . . Working . . . .  </div>
      )}
  }
}
