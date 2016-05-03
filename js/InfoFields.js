// file: AccountFields.jsx

import React from 'react'

const InfoFields = React.createClass({
 render: function() {
 return (
 <div className="col-lg-4 col-md-2 form-group">
  <label>Title</label>
  <input type="text" className="form-control" ref="title" defaultValue={this.props.fieldValues.title} />

  <label>Description</label>
  <input type="text" className="form-control" ref="description" defaultValue={this.props.fieldValues.description} />

  <label>Source</label>
  <input type="text" className="form-control" ref="source" defaultValue={this.props.fieldValues.source} />

  <label>Taglist</label>
  <input type="text" className="form-control" ref="taglist" defaultValue={this.props.fieldValues.taglist} />

  <center><button className="btn btn-success btn-submit" onClick={this.saveAndContinue}>Save and Continue</button></center>
 </div>
 )
 },

 saveAndContinue: function(e) {
   e.preventDefault()

   // Get values via this.refs
   // console.log('For title: ' + this.refs.title.value);
   var data = {
     title : this.refs.title.value,
     description : this.refs.description.value,
     source : this.refs.source.value,
     taglist : this.refs.taglist.value,
   }
   this.props.saveValues(data)
   this.props.nextStep()
  }
  })

export default InfoFields
