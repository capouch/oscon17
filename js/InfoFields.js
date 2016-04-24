// file: AccountFields.jsx

var React = require('react')

var InfoFields = React.createClass({
 render: function() {
 return (
 <div>
 <label>Title</label>
 <input type="text" ref="title" defaultValue={this.props.fieldValues.title} />

 <label>Description</label>
 <input type="text" ref="description" defaultValue={this.props.fieldValues.description} />

 <label>Source</label>
 <input type="text" ref="source" defaultValue={this.props.fieldValues.source} />

 <label>Taglist</label>
 <input type="text" ref="taglist" defaultValue={this.props.fieldValues.taglist} />

 <button onClick={this.saveAndContinue}>Save and Continue</button>
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
