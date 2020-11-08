// Import React DOM
import React from "react";

// Import chart dependencies
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

// Import functions
import { convertValue, titleCase } from "../functions";

export const HorizontalBarChart = (props) => {
  //b.value - a.value works for firefox only
  let arrayData = props.data;
  let sortedArrayData = arrayData.sort(function (a, b) {
    return b.value - a.value;
  });

  let newArrayLabel = [];
  let newArrayData = [];
  sortedArrayData.forEach(function (d) {
    newArrayLabel.push(d.label);
    newArrayData.push(d.value);
  });

  console.log(newArrayLabel);
  console.log(newArrayData);
  const horizontalBarData = {
    type: "horizontalBar",
    labels: newArrayLabel,
    datasets: [
      {
        label: props.title,
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
    tooltips: {
      /*custom: function (tooltip) {
        if (!tooltip) return;
        tooltip.displayColors = false;
      },*/
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || "";
          label += "₱" + tooltipItem.xLabel.toLocaleString();
          return label;
        },
        /*title: function (tooltipItem, data) {
          return titleCase(tooltipItem[0].yLabel);
        },*/
      },
      borderColor: "rgba(175, 59, 110)",
      borderWidth: 1.8,
      cornerRadius: 0,
      backgroundColor: "white",
      titleFontSize: 14,
      titleFontColor: "rgba(0,0,0)",
      bodyFontColor: "rgba(0,0,0)",
      bodyFontSize: 12,
      caretSize: 6,
      bodySpacing: 4,
      xPadding: 8,
      yPadding: 8,
      displayColors: false,
    },
    onClick: props.handleClickEvent,
  };
  return (
    <HorizontalBar
      data={horizontalBarData}
      options={barOptions}
      height={null}
    />
  );
};
