import React, { Component } from "react";
import Chart from "chart.js";
import {
  convertValue,
  sentenceCase,
  parseIntegerMoney,
  oneDecimalPlace,
} from "./functions";

class StackedBarChart extends Component {
  constructor(props) {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "horizontalBar",
      data: {
        labels: [],
        datasets: [
          {
            title: this.props.title,
            label: this.props.firstLabel,
            data: [],
            backgroundColor: "#10819e",
          },
          {
            title: this.props.title,
            label: this.props.secondLabel,
            data: [],
            backgroundColor: "#6c757d",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio: this.props.aspectRatio,
        responsive: true,
        legend: {
          position: "top",
        },
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                display: true,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              stacked: false,
              ticks: {
                display: true,
                beginAtZero: true,
                maxTicksLimit: 5,
                callback: function (label) {
                  return "₱" + convertValue(label);
                },
              },
              gridLines: {
                display: true,
                drawBorder: false,
              },
              scaleLabel: {
                display: false,
              },
            },
          ],
        },
        plugins: {
          datalabels: {
            display: false,
          },
        },
        onHover: (event, chartElement) => {
          event.target.style.cursor = chartElement[0] ? "pointer" : "default";
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const label = dataset.label;
              const value = dataset.data[tooltipItem.index];
              const percentage = oneDecimalPlace(
                (data.datasets[0].data[tooltipItem.index] /
                  data.datasets[1].data[tooltipItem.index]) *
                  100
              );

              if (tooltipItem.datasetIndex !== data.datasets.length - 1) {
                return [
                  percentage + "% of total allocation spent",
                  label + ": " + parseIntegerMoney(value),
                ];
              } else {
                return [label + ": " + parseIntegerMoney(value)];
              }
            },
          },
          borderColor: "black",
          borderWidth: 1.5,
          cornerRadius: 0,
          backgroundColor: "white",
          titleFontColor: "rgba(0,0,0)",
          bodyFontColor: "rgba(0,0,0)",
          titleFontSize: 14,
          bodyFontSize: 14,
          caretSize: 6,
          bodySpacing: 4,
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
        },
        mode: "index",
        onClick: this.props.handleChartClick,
      },
    });
  }
  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map((d) =>
      sentenceCase(d.agency)
    );
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value2);
    this.myChart.data.datasets[1].data = this.props.data.map((d) => d.value1);
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default StackedBarChart;
