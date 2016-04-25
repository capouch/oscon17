import React from 'react'

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <center>
        <h1>Thanks for your submission</h1>
        <a href="/upload">Click here to upload more images</a>
        </center>
      </div>
    );
  }
}

export default Confirmation;
