// Import React DOM
import React from "react";
import moment from "moment";

// Import chart dependencies
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

// Import functions
import { convertValue } from "../functions";

export const BarChart = (props) => {
  const barData = {
    labels: props.xLabel.map((d) => moment(d).format("MMMM DD")),
    datasets: [
      {
        label: props.title,
        data: props.yLabel,
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
            callback: function (value) {
              return "₱" + convertValue(value);
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
            //source: barData,
            display: props.xAxesDisplayTicks, //this will remove the labels
            //maxTicksLimit: 20,
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
          /*type: "time",
          time: {
            unit: "month",
            //unitStepSize: 1000,
            displayFormats: {
              parser: "MM DD YYYY",
              month: "MMM YYYY",
            },
            tooltipFormat: "ll",
          },
          max: "08/31/2020",
          min: "01/01/2020",*/
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
      /*custom: function (tooltip) {
        if (!tooltip) return;
        tooltip.displayColors = false;
      },*/
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || "";
          label += "₱" + tooltipItem.yLabel.toLocaleString();
          return label;
        },
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
    //onClick: waveHello,
    onClick: props.handleClickEvent,
  };

  return <Bar data={barData} options={barOptions} height={null} />;
};

/*tooltips: {
  custom: function (tooltip) {
    if (!tooltip) return;
    // disable displaying the color box;
    tooltip.displayColors = false;
  },
  callbacks: {
    // use label callback to return the desired label
    label: function (tooltipItem, data) {
      return (
        tooltipItem.xLabel +
        ": " +
        "₱" +
        tooltipItem.yLabel.toLocaleString()
      );
    },
    // remove title
    title: function (tooltipItem, data) {
      return;
    },
  },
},*/
