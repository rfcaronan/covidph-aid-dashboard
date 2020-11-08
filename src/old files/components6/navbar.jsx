import React, { Component } from "react";

export default class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light mb-4 px-0 py-2 mx-2">
        <div className="d-flex flex-column p-0">
          <span className="navbar-brand m-0 p-0 font-weight-bold">
            TRACKING COVID-19 AID
          </span>
          <span className="navbar-text text-dark h6 m-0 p-0">
            Analyzing the Philippine government's financial, economic, and
            social aid
          </span>
        </div>
      </nav>
    );
  }
}
