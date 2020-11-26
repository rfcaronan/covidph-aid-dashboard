// I got the full code of the menu from here https://stackoverflow.com/questions/52248179/how-to-use-data-toggle-collapse-in-reactjs-with-bootstrap

import React, { Component } from "react";
import { readRemoteFile } from "react-papaparse";
import { titleCase } from "./subcomponents/functions";
import { CSVLink } from "react-csv";

class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      fullData: [],
      data: [],
    };
    this.updateData = this.updateData.bind(this);
    this.updateMainData = this.updateMainData.bind(this);
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

    readRemoteFile(require("../datasets/mainData.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateMainData,
    });
  }

  updateData(result) {
    const data = result.data;
    this.setState({ data: data });
  }

  updateMainData(result) {
    const data = result.data;
    this.setState({ fullData: data });
  }

  componentDidUpdate() {
    this.state.fullData = this.state.fullData;
  }

  render() {
    console.log(this.state.fullData);
    return (
      <header className="without-padding m-0 p-0">
        <div className="row m-0 p-3">
          <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12">
            <div className="row m-0 p-0">
              <div className="col-lg-12 p-0 m-0">
                {/* Title of the project */}
                {this.state.data
                  .filter(({ textType }) => textType === "header")
                  .map((item) => (
                    <a
                      key={item.index}
                      className="h5 project-header"
                      href={"/" + item.link}
                    >
                      {titleCase(item.text)}
                    </a>
                  ))}
              </div>
              <div className="col project-subheader p-0 m-0">
                {/* Subtitle */}
                {this.state.data
                  .filter(({ textType }) => textType === "subhead")
                  .map((item) => (
                    <p key={item.index}>{item.text}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-4 col-xs-12">
            <div className="row m-0 p-0">
              <div className="col-lg-12 m-0 p-0">
                <div
                  class="progress-bar bg-info"
                  style={{ width: "15%", height: "8px" }}
                ></div>
              </div>

              <div className="d-inline">
                {this.state.data
                  .filter(({ textType }) => textType === "nav-item")
                  .map((item) => (
                    <p key={item.index} className="d-inline">
                      {item.text}{" "}
                    </p>
                  ))}

                <u>
                  <CSVLink data={this.state.fullData} filename={"dataset.csv"}>
                    Download the dataset here.
                  </CSVLink>
                </u>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
