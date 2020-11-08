import React, { Component } from "react";
// parser
import { readRemoteFile } from "react-papaparse";
// chart.js
import { Bar, Doughnut } from "react-chartjs-2";

const numbers = [1, 2, 3, 4];
const listItems = numbers.map((number) => <li>{number}</li>);

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };

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
    //console.log(data);
  }

  render() {
    const numbers = this.state.posts.map((d) => d.Amount);
    const labels = this.state.posts.map((d) => d.Month);
    console.log(numbers);
    const barData = {
      labels: labels,
      datasets: [
        {
          backgroundColor: ["orange", "blue", "red", "purple", "green"],
          borderColor: "black",
          borderWidth: 3,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: numbers,
        },
      ],
    };

    return (
      <div>
        <div>{this.state.posts.map((d) => d.Amount)}</div>
        <ul>{listItems}</ul>
        <Bar data={barData} />
      </div>
    );
  }
}

export default Charts;
