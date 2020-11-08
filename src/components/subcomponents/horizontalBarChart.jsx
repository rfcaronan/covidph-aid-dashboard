import React, { Component } from "react";
import Chart from "chart.js";
import {
  convertValue,
  sentenceCase,
  parseIntegerMoney,
  oneDecimalPlace,
} from "./functions";

class HorizontalBarChart extends Component {
  constructor(props) {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    let maxDataValue;
    this.myChart = new Chart(this.canvasRef.current, {
      type: "horizontalBar",
      data: {
        labels: [],
        datasets: [
          {
            title: this.props.title,
            label: this.props.title,
            data: [],
            backgroundColor: "#10819e",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio: this.props.aspectRatio,
        responsive: true,
        legend: false,
        scales: {
          yAxes: [
            {
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
              ticks: {
                display: true,
                beginAtZero: true,
                suggestedMax: maxDataValue,
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
            title: function (tooltipItem, data) {
              return data["labels"][tooltipItem[0]["index"]];
            },
            label: function (tooltipItem, data) {
              let dataset = data.datasets[tooltipItem.datasetIndex];

              let total = dataset.data.reduce(function (
                previousValue,
                currentValue
              ) {
                return previousValue + currentValue;
              });

              let currentValue = dataset.data[tooltipItem.index];

              let percentage = oneDecimalPlace((currentValue / total) * 100);

              return [
                parseIntegerMoney(
                  data["datasets"][0]["data"][tooltipItem["index"]]
                ),
                percentage + "% of total aid",
              ];
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
        mode: "point",
        intersect: true,
        onClick: this.props.handleChartClick,
      },
    });
  }
  componentDidUpdate() {
    let maxDataValue = Math.max(
      Math.max(...this.props.data.map((d) => d.value))
    );

    this.myChart.data.labels = this.props.data.map((d) =>
      sentenceCase(d.label)
    );
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.myChart.options.scales.xAxes[0].ticks.suggestedMax = maxDataValue;
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default HorizontalBarChart;
