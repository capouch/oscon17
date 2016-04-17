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

const businessAddress = (
  <address>
    <strong>{brandName}</strong><br/>
    Saint Josephs College<br/>
    Rensselaer IN 47978<br/>
    +1 (219) 866-6000
  </address>
);

const brandName = "Scene:History";
const brand = <span>{brandName}</span>;

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
