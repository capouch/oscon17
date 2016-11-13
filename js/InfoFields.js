/*
  ** InfoFields: Input form for image meta-information
  ** Control passes to saveValues in Upload module after user submits form
*/

import React from 'react'

let deleteStyle = { background: "red"},
  deleteRef = undefined,
  // Default is no delete button (for upload)
  deleteButton = undefined

// Optional delete button on edit screens
// Wrap an HTML button into a component
const buttonStyle = {
  background: 'red',
  marginTop: '1',
  marginBottom: '1',
  width: '100%'
  }
const DeleteButton = React.createClass({
  render: function () {
    return (
      <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={deleteRef}>
        Delete this Record!!</button>
    )
  }
})

export default React.createClass({
  componentWillMount: function() {
    // Move function reference to module-scoped variable
    deleteRef = this.deleteRecord
  },
  render: function() {

    // Display delete button for edit/delete view
    if (!this.props.isCreate) {
      deleteButton = <DeleteButton />
      }
    else {
      deleteButton = undefined
    }
    return (
      <div className="col-lg-8 col-md-2 form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          ref="title"
          defaultValue={this.props.fieldValues.title} />

        <label>Description</label>
        <input
          type="text"
          className="form-control"
          ref="description"
          defaultValue={this.props.fieldValues.description} />

        <label>Source</label>
        <input
          type="text"
          className="form-control"
          ref="source"
          defaultValue={this.props.fieldValues.source} />

        <label>Taglist</label>
        <input
          type="text"
          className="form-control"
          ref="taglist"
          defaultValue={this.props.fieldValues.taglist} />

        <center>
          <button
            className="btn btn-success btn-submit"
            onClick={this.saveAndContinue}>
            Save and Continue
          </button>
        </center>

        <center>
          {deleteButton}
        </center>
      </div>
    )
  },
  saveAndContinue: function(e) {
    e.preventDefault()

    // Get values via this.refs
    // console.log('For title: ' + this.refs.title.value);
    const data = {
      title : this.refs.title.value,
      description : this.refs.description.value,
      source : this.refs.source.value,
      taglist : this.refs.taglist.value,
    }
    this.props.saveValues(data)
    this.props.nextStep()
  },

  deleteRecord: function(e) {
    e.preventDefault()

    // Get values via this.refs
    // console.log('For title: ' + this.refs.title.value);

    // Post alert here
    // Extract _id field here, or back in the caller?
    let accept = confirm('Are you sure?')
    if (accept) {
      this.props.deleteRecord()
      this.props.nextStep()
    }
  }

})
