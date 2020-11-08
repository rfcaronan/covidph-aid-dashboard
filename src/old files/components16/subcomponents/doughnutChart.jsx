import React, { Component } from "react";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";
import { colors, oneDecimalPlace, parseIntegerMoney } from "./functions";

class DoughnutChart extends Component {
  constructor(props) {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "doughnut",
      data: {
        labels: this.props.data.map((d) => d.label),
        datasets: [
          {
            title: this.props.title,
            data: this.props.data.map((d) => parseInt(d.value)),
            backgroundColor: colors,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio: 2,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 13,
            bottom: 6,
          },
        },
        rotation: 0,
        legend: {
          display: false,
          position: "right",
          reverse: false,
        },
        plugins: {
          datalabels: {
            labels: {
              name: {
                align: "end",
                anchor: "end",
                backgroundColor: null,
                borderColor: null,
                padding: 1,
                //font: { size: 14 },
                formatter: function (labels, ctx) {
                  let index = ctx.dataIndex;
                  let label = ctx.chart.data.labels[index];
                  let value = ctx.chart.data.datasets[0];

                  let total = value.data.reduce(function (
                    previousValue,
                    currentValue
                  ) {
                    return previousValue + currentValue;
                  });

                  let currentValue = value.data[index];

                  let percentage = oneDecimalPlace(
                    (currentValue / total) * 100
                  );
                  return label + ": " + percentage + "%";
                },
              },
            },
          },
        },
        //events: ["mousemove"], // this is needed, otherwise onHover is not fired
        onHover: (event, chartElement) => {
          event.target.style.cursor = chartElement[0] ? "pointer" : "default";
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              /* var label = myChart.data.labels[firstPoint._index];*/
              return data.labels[tooltipItem[0].index];
            },
            label: function (tooltipItem, data) {
              /* var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];*/
              let value = data.datasets[tooltipItem.datasetIndex];

              let total = value.data.reduce(function (
                previousValue,
                currentValue
              ) {
                return previousValue + currentValue;
              });

              let currentValue = value.data[tooltipItem.index];

              let percentage = oneDecimalPlace((currentValue / total) * 100);

              return [
                parseIntegerMoney(data.datasets[0].data[tooltipItem.index]),
                percentage + "% of total aid",
              ];
            },
          },
          titleFontSize: 14,
          bodyFontSize: 14,
          caretSize: 6,
          bodySpacing: 4,
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        onClick: this.props.handleChartClick,
      },
    });
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map((d) => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default DoughnutChart;
