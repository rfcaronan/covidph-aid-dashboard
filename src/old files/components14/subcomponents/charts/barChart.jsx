import React, { useEffect } from "react";
import Chart from "chart.js";
import {
  convertValue,
  sentenceCase,
  parseIntegerMoney,
  oneDecimalPlace,
} from "./functions";

export const HorizontalBarChart = (props) => {
  useEffect(() => {
    const ctx = document.getElementById(props.title);

    let arrayData = props.data;
    let sortedArrayData = arrayData.sort(function (a, b) {
      return b.value - a.value;
    });

    let newArrayLabel = [];
    let newArrayData = [];
    sortedArrayData.forEach(function (d) {
      newArrayLabel.push(sentenceCase(d.label));
      newArrayData.push(d.value);
    });

    const myChart = new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: newArrayLabel,
        datasets: [
          {
            label: props.title,
            data: newArrayData,
            backgroundColor: "#10819e",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio: props.aspectRatio,
        responsive: true,
        legend: false,
        scales: {
          yAxes: [
            {
              ticks: {
                display: true,
                beginAtZero: true,
                mirror: false,
              },
              gridLines: {
                display: false,
                borderDash: props.yAxesBorderDash,
                drawBorder: props.yAxesDrawBorder,
              },
              scaleLabel: {
                display: props.yAxesDisplayScaleLabel,
                labelString: props.yAxesLabelString,
                fontColor: props.yAxesFontColorScaleLabel,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: true,
                beginAtZero: true,
                stepSize: props.xAxesStepSize,
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
                labelString: props.xAxesLabelString,
                fontColor: props.xAxesFontColorScaleLabel,
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
          titleFontSize: 14,
          bodyFontSize: 14,
          caretSize: 6,
          bodySpacing: 4,
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
        },
        mode: "nearest",
        intersect: true,
        onClick: props.handleChartClick,
      },
    });
  });
  return (
    <div className="App">
      <canvas id={props.title} />
    </div>
  );
};
