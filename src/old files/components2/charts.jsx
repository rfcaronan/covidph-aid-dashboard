import React, { Component } from "react";
//import { getData, csvData, month } from "./dataServiceF";
import { getData } from "./dataService2";
import { Bar } from "react-chartjs-2";

export class BarChart extends React.Component {
  render() {
    const barData = {
      labels: this.props.data.map((d) => d.label),
      datasets: [
        {
          label: this.props.title,
          data: this.props.data.map((d) => d.value),
          backgroundColor: this.props.color,
        },
      ],
    };

    return (
      <div>
        <Bar data={barData} />
      </div>
    );
  }
}
