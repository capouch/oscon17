import React from "react";
import { Link } from "react-router";
import {
  Footer, FooterAddress,
  Page,
  Section,
} from "neal-react";

import Header from './Header'
import PageFooter from './Footer'
import Browse from './Browse'

export default (props) => {
  return (
    <div>
      <Header />
      <Browse
          className = "display-4"/>
      <PageFooter/>
    </div>
  );
};
