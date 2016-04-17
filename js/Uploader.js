import React from "react";

import Header from './Header'
import PageFooter from './Footer'
import Upload from './Upload'

export default (props) => {
  return (
    <div>
      <Header />
      <Upload />
      <PageFooter />
    </div>
  );
};
