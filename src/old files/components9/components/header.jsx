// I got the full code from here https://stackoverflow.com/questions/52248179/how-to-use-data-toggle-collapse-in-reactjs-with-bootstrap

import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  render() {
    const show = this.state.menu ? "show bg-white" : "";
    const hide = this.state.menu ? "" : "show";

    return (
      <header className="without-padding mb-4">
        <nav className="navbar navbar-expand-lg navbar-light">
          <button
            className={"navbar-toggler p-2"}
            type="button"
            onClick={this.toggleMenu}
          >
            <span className={"navbar-toggler-icon"}></span>
          </button>
          <div className={"collapse navbar-collapse p-1 " + show}>
            <div className="navbar-nav text-muted">
              <a className="nav-item nav-link active" href="/">
                About this data <span class="sr-only">(current)</span>
              </a>
              <a className="nav-item nav-link" href="/">
                Budget 101
              </a>
            </div>
          </div>
        </nav>
        <div className={"col-lg-8 pl-4 p-2 collapse navbar-collapse " + hide}>
          <a className="h1 project-header" href="/index">
            Tracking the National Government's Covid-19 Aid Spending
          </a>

          <div className="h5 project-subheader py-3">
            The national government is spending billions of pesos to manage the
            COVID-19 crisis. Explore how much the government is paying for aid,
            what it supports, and to whom it gives aid.
          </div>
        </div>
      </header>
    );
  }
}
