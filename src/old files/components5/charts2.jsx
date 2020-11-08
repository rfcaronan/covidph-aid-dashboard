import React, { Component } from "react";
import { getData, csvData, month } from "./dataServiceF";
import { Bar } from "react-chartjs-2";

class Chart extends Component {
  state = { data: getData };
  render() {
    /*const numbers = this.state.data.map((d) => d.Amount);
    const labels = this.state.data.map((d) => d.Month);*/

    const datum = this.state.data;

    console.log(month[0]);
    console.log(csvData.Month);
    console.log(datum.length);
    const numbers = this.props;
    //const labels = this.state.list.map((d) => d.Month);
    console.log(numbers);
    //["January", "February", "March", "April", "May", "June", "July"]
    const barData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          //backgroundColor: ["orange", "blue", "red", "purple", "green"],
          borderColor: "black",
          borderWidth: 3,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [1, 2, 3, 4, 5, 6, 7, 8],
        },
      ],
    };
    //<div>{this.state.list.map((d) => d.Month)}</div>
    return (
      <div>
        <Bar data={barData} />
      </div>
    );
  }
}

export default Chart;
