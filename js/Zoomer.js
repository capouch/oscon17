import React from "react";


import Header from './Header'
import PageFooter from './Footer'
import Zoom from './Zoom'

export default (props) => {
  return (
    <div>
      <Header />
      <Zoom
        className = "display-4"/>
      <PageFooter />
    </div>
  );
};
