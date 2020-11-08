import React, { Component } from "react";
import { readRemoteFile } from "react-papaparse";

class DataParser extends Component {
  constructor() {
    // Call super class
    super();
    this.state = {
      posts: [],
    };
    // Bind this to function updateData
    this.updateData = this.updateData.bind(this);
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  componentDidMount() {
    // Your parse code, but not seperated in a function
    var csvFilePath = require("./data.csv");
    readRemoteFile(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData,
    });
  }

  updateData(result) {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({ posts: data }); // or shorter ES syntax: this.setState({ data });
    //console.log(posts);
    console.log(data);
  }

  render() {
    // Your render function
    return (
      <React.Fragment>
        <div>{this.state.posts.map((d) => [d.Amount])}</div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.ID}>
                <td>{post.ID}</td>
                <td>{post.Month}</td>
                <td>{post.Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default DataParser;
