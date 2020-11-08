import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light pl-0 mb-2">
        <span className="d-flex flex-column p-0">
          <span className="navbar-brand m-0 p-0 h1 red-text font-weight-bold">
            TRACKING COVID-19 AID
          </span>
          <span className="navbar-text text-dark h6 m-0 p-0">
            Analyzing the financial, economic, and social aid to Filipinos
          </span>
        </span>
      </nav>
    );
  }
}

export default NavBar;
