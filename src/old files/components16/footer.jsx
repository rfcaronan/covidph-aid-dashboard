import React, { Component } from "react";
import { readRemoteFile } from "react-papaparse";

export default class Footer extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
    };
    this.updateData = this.updateData.bind(this);
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

  render() {
    return (
      <div className="card-footer text-muted mx-3 with-padding">
        {this.state.data
          .filter(({ textType }) => textType === "footer-item")
          .map((item, i) => (
            <p key={i}>
              <a href={"/" + item.link}>{item.text}</a>
            </p>
          ))}
      </div>
    );
  }
}
