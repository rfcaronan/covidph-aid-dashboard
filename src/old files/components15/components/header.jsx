// I got the full code of the menu from here https://stackoverflow.com/questions/52248179/how-to-use-data-toggle-collapse-in-reactjs-with-bootstrap

import React, { Component } from "react";
import { readRemoteFile } from "react-papaparse";
import { titleCase } from "./subcomponents/functions";

class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      menu: false,
    };
    this.updateData = this.updateData.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    var csvFilePath = require("../datasets/textData.csv");
    readRemoteFile(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateData,
    });
  }

  updateData(result) {
    const data = result.data;
    this.setState({ data: data });
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  render() {
    const show = this.state.menu ? "show bg-white" : "";
    const hide = this.state.menu ? "" : "show";

    return (
      <header className="without-padding m-0">
        {/* Here goes the hamburger menu */}
        <nav className="navbar navbar-expand-lg navbar-light">
          <button
            className={"navbar-toggler p-2"}
            type="button"
            onClick={this.toggleMenu}
          >
            <span className={"navbar-toggler-icon"}></span>
          </button>
          <div className={"col-lg-9 p-2 m-0 collapse navbar-collapse " + hide}>
            <div className={"row m-0 p-0"}>
              <div className={"col-lg-12 px-1 py-0 m-0"}>
                {/* Title of the project */}
                {this.state.data
                  .filter(({ textType }) => textType === "header")
                  .map((item, i) => (
                    <a
                      key={i}
                      className="h5 project-header"
                      href={"/" + item.link}
                    >
                      {titleCase(item.text)}
                    </a>
                  ))}
              </div>
              <div className="col project-subheader px-1 m-0">
                {/* Subtitle */}
                {this.state.data
                  .filter(({ textType }) => textType === "subhead")
                  .map((d) => d.text)}
              </div>
            </div>
          </div>
          <div className={"col-lg-3 collapse navbar-collapse p-1 " + show}>
            {/* Display the list of nav items horizontally */}
            <div className="navbar-nav text-muted">
              {this.state.data
                .filter(({ textType }) => textType === "nav-item")
                .map((item, i) => (
                  <a
                    key={item.index}
                    className="nav-item nav-link"
                    href={"/" + item.link}
                  >
                    {item.text}{" "}
                  </a>
                ))}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
