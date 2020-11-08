import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart } from "react-google-charts";
import { getDefaultNormalizer } from "@testing-library/react";

let data1 = {
  labels: ["Delivered", "Disburse"],
  datasets: [
    {
      label: "Delivery",
      backgroundColor: ["#0d98ba", "#808080"],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
      ],
      data: [81, 19],
    },
  ],
};

/*{
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },*/

let data2 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65, 80, 100],
      lineTension: 0,
      fill: false,
      backgroundColor: "rgba(255,0,0,1)",
      pointBorderColor: "black",
      borderColor: "red",
      backgroundColor: "red",
    },
  ],
};

let options1 = {
  maintainAspectRatio: false,
  responsive: true,
  defaultFontColor: "#8a8989",
  defaultFontFamily: "'Maax-Standard', 'Helvetica', 'Arial', 'sans-serif'",
  title: {
    display: false,
    text: "DISBURSEMENT TIMELINE",
    align: "start",
    fontSize: 12,
  },
  legend: {
    display: false,
    position: "bottom",
    reverse: "true",
    labels: {
      boxWidth: 10,
      fontColor: "black",
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: true,
          beginAtZero: true,
          suggestedMax: 100,
          maxTicksLimit: 6,
          lineHeight: 3,
        },
        gridLines: {
          borderDash: [8, 4],
        },
        scaleLabel: {
          display: true,
          labelString: "Y-axes",
          fontColor: "red",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        scaleLabel: {
          display: false,
          labelString: "X-axes",
          fontColor: "red",
        },
      },
    ],
  },
};

let options2 = {
  pieceLabel: {
    render: "value",
  },
  rotation: 0,
  title: {
    display: false,
    text: "Chart Title",
    fontSize: 15,
    responsive: true,
  },
  legend: {
    display: false,
    position: "bottom",
  },
  plugins: {
    datalabels: {
      align: "end",
      anchor: "end",
      backgroundColor: null,
      borderColor: null,
      borderRadius: 4,
      borderWidth: 1,
      color: "#777",
      font: {
        size: 12,
      },
      offset: 16,
      padding: 0,
      formatter: function (value, context) {
        return context.chart.data1.labels[context.dataIndex] || null;
      },
    },
  },
};

//px-2 py-2 shadow-sm bg-white border-dark rounded
//style={{ height: 175 }}
//px-lg-5
class Charts extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row mb-3 p-0 border border-danger align-items-center">
          <div className="col-4 border border-danger">
            <div className="row border border-info">
              <div className="col-6 p-0 mx-0 border border-primary">
                <div className="card border border-danger">
                  <div className="card-body p-1">
                    <h3 className="card-title">₱23</h3>
                    <h6 className="card-subtitle mb-2 text-muted">billion</h6>
                  </div>
                </div>
              </div>
              <div className="col-6 p-0 mx-0 border border-primary">
                <div className="card">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">18.28</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      poor families
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-6 p-0 mx-0 border border-primary">
                <div className="card">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">18.28</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      poor families
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-6 p-0 mx-0 border border-primary">
                <div className="card">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">18.28</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      poor families
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8 p-0">
            <h6 className="p-0 mb-0 text-muted text-uppercase small font-weight-bold">
              Disbursement Timeline
            </h6>
            <p className="p-0 mb-0 small">
              Some quick example text to build on the card title and make up the
              card's content.
            </p>
            <div className="col card border border-dark">
              <Line data={data2} options={options1} />
            </div>
          </div>
        </div>
        <div className="row mb-3 p-0 border border-danger">
          <div classname="col-4 p-0 shadow-sm border border-light bg-white rounded">
            <h6 className="py-0 mb-0 text-muted small text-uppercase font-weight-bold">
              Delivery Status
            </h6>
            <p className="py-0 mb-0 small">Some quick example text to build.</p>
            <div className="col p-0 border border-primary">
              <div className="card border border-dark">
                <Doughnut data={data1} options={options2} />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3 p-0 border border-danger">
          <div className="col-12 p-0">
            <h6 className="p-0 mb-0 text-muted text-uppercase small font-weight-bold">
              Disbursement Timeline
            </h6>
            <p className="p-0 mb-0 small">
              Some quick example text to build on the card title and make up the
              card's content.
            </p>
            <div className="col card border border-dark">
              <Chart
                //width={600}
                //height={"300px"}
                chartType="Sankey"
                loader={<div>Loading Chart</div>}
                data={[
                  ["From", "To", "Weight"],
                  ["Brazil", "Portugal", 5],
                  ["Brazil", "France", 1],
                  ["Brazil", "Spain", 1],
                  ["Brazil", "England", 1],
                  ["Canada", "Portugal", 1],
                  ["Canada", "France", 5],
                  ["Canada", "England", 1],
                  ["Mexico", "Portugal", 1],
                  ["Mexico", "France", 1],
                  ["Mexico", "Spain", 5],
                  ["Mexico", "England", 1],
                  ["USA", "Portugal", 1],
                  ["USA", "France", 1],
                  ["USA", "Spain", 1],
                  ["USA", "England", 5],
                  ["Portugal", "Angola", 2],
                  ["Portugal", "Senegal", 1],
                  ["Portugal", "Morocco", 1],
                  ["Portugal", "South Africa", 3],
                  ["France", "Angola", 1],
                  ["France", "Senegal", 3],
                  ["France", "Mali", 3],
                  ["France", "Morocco", 3],
                  ["France", "South Africa", 1],
                  ["Spain", "Senegal", 1],
                  ["Spain", "Morocco", 3],
                  ["Spain", "South Africa", 1],
                  ["England", "Angola", 1],
                  ["England", "Senegal", 1],
                  ["England", "Morocco", 2],
                  ["England", "South Africa", 7],
                  ["South Africa", "China", 5],
                  ["South Africa", "India", 1],
                  ["South Africa", "Japan", 3],
                  ["Angola", "China", 5],
                  ["Angola", "India", 1],
                  ["Angola", "Japan", 3],
                  ["Senegal", "China", 5],
                  ["Senegal", "India", 1],
                  ["Senegal", "Japan", 3],
                  ["Mali", "China", 5],
                  ["Mali", "India", 1],
                  ["Mali", "Japan", 3],
                  ["Morocco", "China", 5],
                  ["Morocco", "India", 1],
                  ["Morocco", "Japan", 3],
                ]}
                rootProps={{ "data-testid": "2" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
