// Import React DOM
import React from "react";

// Import chart dependencies
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

// Import functions
import { greeting, waveHello, convertValue } from "../functions";

export const BarChart = (props) => {
  const barData = {
    labels: props.data.map((d) => d.label),
    datasets: [
      {
        label: props.title,
        data: props.data.map((d) => d.value),
        backgroundColor: props.color,
      },
    ],
  };
  const barOptions = {
    maintainAspectRatio: props.maintainAspectRatio,
    aspectRatio: props.aspectRatio,
    responsive: props.responsive,
    legend: props.legend,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: props.yAxesDisplayTicks, // this will remove the label
            beginAtZero: props.yAxesBeginAtZero,
            suggestedMax: props.yAxesSuggestedMax,
            maxTicksLimit: props.yAxesMaxTicksLimit,
            lineHeight: props.yAxesLineHeight,
            stepSize: props.yAxesStepSize,
            callback: function (label) {
              return "₱" + convertValue(label);
            },
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
    annotation: {
      annotations: [
        {
          drawTime: "afterDraw",
          type: "line",
          //id: "vLine",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: 1, // Data value to draw the line at
          //endValue: 0, // Optional value at which the line draw should end
          borderWidth: 0,
          borderDash: [0, 100],
          label: {
            xAdjust: 0,
            yAdjust: -6,
            backgroundColor: "white",
            content: "March 16: ECQ in Luzon",
            enabled: true,
            fontColor: "black",
            fontSize: 10,
            fontStyle: "normal",
            position: "top",
            xPadding: 10,
            textAlign: "left",
          },
        },

        {
          drawTime: "afterDraw",
          type: "line",
          //id: "vLine",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: 4, // Data value to draw the line at
          //endValue: 0, // Optional value at which the line draw should end
          borderWidth: 0,
          borderDash: [0, 100],
          label: {
            xAdjust: 0,
            yAdjust: -6,
            backgroundColor: "white",
            content: "March 16: Lockdown in Luzon",
            enabled: true,
            fontColor: "black",
            fontSize: 10,
            fontStyle: "normal",
            position: "top",
            xPadding: 10,
            textAlign: "left",
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || "";

          if (label) {
            label += ": ";
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        },
      },
    },
    //onClick: waveHello,
    onClick: props.handleClickEvent,
  };

  return <Bar data={barData} options={barOptions} height={null} />;
};
