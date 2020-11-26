import React, { Component } from "react";
import { readRemoteFile } from "react-papaparse";
import { CSVLink } from "react-csv";

export default class Footer extends Component {
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
    return (
      <div className="card-footer text-muted mx-3 with-padding">
        <u>
          <CSVLink data={this.state.fullData} filename={"dataset.csv"}>
            Download the dataset here.
          </CSVLink>
        </u>
        {this.state.data
          .filter(({ textType }) => textType === "footer-item")
          .map((item) => (
            <p key={item.index}>
              <a href={"/" + item.link}>{item.text}</a>
            </p>
          ))}
      </div>
    );
  }
}
