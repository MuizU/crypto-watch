import React, { Component } from "react";
import moment from "moment";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="text-center">
        &copy;<small>Copyright {moment().format("YYYY")} Muiz Uvais</small>
      </footer>
    );
  }
}
