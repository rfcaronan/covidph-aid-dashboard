import React, { Component } from "react";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";
import { convertValue } from "./functions";

class Timeline extends Component {
  constructor(props) {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    let maxDataValue;

    const colours = (ctx) => {
      let value = ctx.dataset.data[ctx.dataIndex].y;
      return value < 0 ? "#99335F" : "#10819e";
    };

    this.myChart = new Chart(this.canvasRef.current, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            title: this.props.title,
            //label: this.props.title,
            data: [],
            fill: false,
            borderColor: "#10819e",
            backgroundColor: "#10819e",
            pointBorderColor: colours,
            pointBackgroundColor: colours,
            pointRadius: 2,
            borderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 2,
        responsive: true,
        legend: false,
        scales: {
          yAxes: [
            {
              ticks: {
                display: true,
                beginAtZero: true,
                suggestedMax: maxDataValue,
                maxTicksLimit: 6,
                callback: function (value) {
                  return "₱" + convertValue(value);
                },
                padding: 20,
              },
              gridLines: {
                display: true,
                drawBorder: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: true,
                maxTicksLimit: 6,
                maxRotation: 0,
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              type: "time",
              distribution: "series",
              time: {
                unit: "month",
                displayFormats: { month: "MMM D" },
                tooltipFormat: "ll",
              },
            },
          ],
        },
        plugins: {
          datalabels: {
            display: false,
          },
        },
        annotation: {
          annotations: [
            {
              drawTime: "afterDraw",
              type: "line",
              mode: "vertical",
              scaleID: "x-axis-0",
              value: 1, // Data value to draw the line at
              //endValue: 0, // Optional value at which the line draw should end
              borderWidth: 0,
              borderDash: [0, 100],
              label: {
                xAdjust: this.props.annotationXAdjustText1,
                yAdjust: this.props.annotationYAdjustText1,
                backgroundColor: "white",
                content: this.props.annotationText1,
                enabled: true,
                fontColor: "black",
                fontSize: 12,
                fontStyle: "bold",
                position: "top",
                xPadding: 0,
                textAlign: "left",
              },
            },

            {
              drawTime: "afterDraw",
              type: "line",
              mode: "vertical",
              scaleID: "x-axis-0",
              value: 4, // Data value to draw the line at
              //endValue: 0, // Optional value at which the line draw should end
              borderWidth: 0,
              borderDash: [0, 100],
              label: {
                xAdjust: this.props.annotationXAdjustText2,
                yAdjust: this.props.annotationYAdjustText2,
                backgroundColor: "white",
                content: this.props.annotationText2,
                enabled: true,
                fontColor: "black",
                fontSize: 12,
                fontStyle: "normal",
                position: "top",
                xPadding: 0,
                textAlign: "left",
              },
            },
            {
              drawTime: "afterDraw",
              type: "line",
              mode: "vertical",
              scaleID: "x-axis-0",
              value: 1, // Data value to draw the line at
              //endValue: 0, // Optional value at which the line draw should end
              borderWidth: 0,
              borderDash: [0, 100],
              label: {
                xAdjust: this.props.annotationXAdjustText3,
                yAdjust: this.props.annotationYAdjustText3,
                backgroundColor: "white",
                content: this.props.annotationText3,
                enabled: true,
                fontColor: "black",
                fontSize: 12,
                fontStyle: "bold",
                position: "top",
                xPadding: 0,
                textAlign: "left",
              },
            },
            {
              drawTime: "afterDraw",
              type: "line",
              mode: "vertical",
              scaleID: "x-axis-0",
              value: 1, // Data value to draw the line at
              //endValue: 0, // Optional value at which the line draw should end
              borderWidth: 0,
              borderDash: [0, 100],
              label: {
                xAdjust: this.props.annotationXAdjustText4,
                yAdjust: this.props.annotationYAdjustText4,
                backgroundColor: "white",
                content: this.props.annotationText4,
                enabled: true,
                fontColor: "black",
                fontSize: 12,
                fontStyle: "normal",
                position: "top",
                xPadding: 0,
                textAlign: "left",
              },
            },
          ],
        },
        tooltips: {
          custom: function (tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function (tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label || "";
              label += "₱" + tooltipItem.yLabel.toLocaleString();
              return label;
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
        onClick: this.props.onClickEvent,
      },
    });
  }

  componentDidUpdate() {
    let newArray = [];
    let newArrayLabel = [];

    this.props.data.forEach(function (d) {
      newArray.push({
        t: d.label,
        y: d.value,
      });
      newArrayLabel.push(d.label);
    });

    let maxDataValue = Math.max(Math.max(...newArray.map((d) => d.y)) * 1.3);

    this.myChart.data.labels = newArrayLabel;
    this.myChart.data.datasets[0].data = newArray;
    this.myChart.options.scales.yAxes[0].ticks.suggestedMax = maxDataValue;
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} height={this.props.height} />;
  }
}

export default Timeline;