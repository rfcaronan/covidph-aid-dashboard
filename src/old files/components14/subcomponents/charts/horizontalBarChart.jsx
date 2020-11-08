// Import React DOM
import React from "react";

// Import chart dependencies
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

// Import functions
import {
  convertValue,
  oneDecimalPlace,
  titleCase,
  sentenceCase,
  parseIntegerMoney,
} from "../functions";

export const HorizontalBarChart = (props) => {
  //b.value - a.value works for firefox only
  let arrayData = props.data;
  let sortedArrayData = arrayData.sort(function (a, b) {
    return b.value - a.value;
  });

  let newArrayLabel = [];
  let newArrayTooltip = [];
  let newArrayData = [];
  sortedArrayData.forEach(function (d) {
    newArrayLabel.push(sentenceCase(d.label));
    newArrayData.push(d.value);
  });

  //console.log(newArrayLabel);
  //console.log(newArrayData);

  const horizontalBarData = {
    type: "horizontalBar",
    labels: newArrayLabel,
    datasets: [
      {
        title: props.title,
        label: newArrayLabel,
        data: newArrayData,
        backgroundColor: props.color,
      },
    ],
  };
  let barOptions = {
    maintainAspectRatio: props.maintainAspectRatio,
    aspectRatio: props.aspectRatio,
    responsive: props.responsive,
    legend: props.legend,
    scales: {
      yAxes: [
        {
          ticks: {
            display: props.yAxesDisplayTicks, // this will remove the label
            beginAtZero: props.yAxesBeginAtZero,
            suggestedMax: props.yAxesSuggestedMax,
            maxTicksLimit: props.yAxesMaxTicksLimit,
            lineHeight: props.yAxesLineHeight,
          },
          gridLines: {
            display: props.yAxesDisplayGridLines,
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
            display: props.xAxesDisplayTicks, //this will remove the labels
            beginAtZero: props.xAxesBeginAtZero,
            stepSize: props.xAxesStepSize,
            maxTicksLimit: props.xAxesMaxTicksLimit,
            callback: function (label) {
              return "₱" + convertValue(label);
            },
          },
          gridLines: {
            display: props.xAxesDisplayGridLines,
            drawBorder: props.xAxesDrawBorder,
          },
          scaleLabel: {
            display: props.xAxesDisplayScaleLabel,
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
            currentValue,
            currentIndex,
            array
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

        /*{
      /*custom: function (tooltip) {
        if (!tooltip) return;
        tooltip.displayColors = false;
      },*/
        /*callbacks: {
        label: function (tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || "";
          label += "₱" + tooltipItem.xLabel.toLocaleString();
          return label;
        },*/
        /*title: function (tooltipItem, data) {
          return titleCase(tooltipItem[0].yLabel);
        },*/
      },
      //borderColor: "rgb(153,51,95)",
      //borderWidth: 1.8,
      //cornerRadius: 0,
      //backgroundColor: "white",
      titleFontSize: 14,
      //titleFontColor: "rgba(0,0,0)",
      //bodyFontColor: "rgba(0,0,0)",
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
  };
  return (
    <HorizontalBar
      data={horizontalBarData}
      options={barOptions}
      height={null}
    />
  );
};
