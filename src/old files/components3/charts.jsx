import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { csv } from "d3-request";

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    console.log(this.state.data.labels);
  }

  /*this.state = {
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: "Videos",
            backgroundColor: "red",
            data: [4, 5, 1, 10, 32, 2, 12],
          },
        ],
      },
    };
  }*/

  componentWillMount() {
    csv("./data.csv", (error, data) => {
      if (error) {
        this.setState({ loadError: true });
      }
      this.setState({
        data: data.map((d) => ({
          labels: [d.month],
          datasets: [
            {
              label: "First dataset",
              data: [d.amount],
              lineTension: 0,
              fill: false,
              backgroundColor: "rgba(255,0,0,1)",
              pointBorderColor: "black",
              borderColor: "red",
              backgroundColor: "red",
            },
          ],
        })),
      });
    });
  }

  render() {
    if (this.state.loadError) {
      return <div>couldn't load file</div>;
    }
    if (!this.state.data) {
      return <div />;
    }
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "3px",
          boxShadow: "0 1 2 0 rgba(0,0,0,0.1)",
          margin: 12,
          padding: 24,
          width: "350px",
        }}
      >
        <h1>Birth and death rates of selected countries</h1>
        <h2>per 1,000 inhabitants</h2>

        <Line data={this.state.data} />
      </div>
    );
  }
}

export default Charts;
