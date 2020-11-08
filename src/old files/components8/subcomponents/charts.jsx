import React from "react";

// Import other dependencies
import { convertUnicode } from "../../components/subcomponents/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

// Import chartjs dependencies
import { Bar, HorizontalBar, Doughnut } from "react-chartjs-2";
import { convertValue } from "../../components/subcomponents/functions";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

// Import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highchartsSankey from "highcharts/modules/sankey";
highchartsSankey(Highcharts);

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
            content: "March 16: GCQ",
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
            content: "March 16: GCQ",
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
  };

  return <Bar data={barData} options={barOptions} height={null} />;
};

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
            stepSize: 5000,
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
  };
  return (
    <HorizontalBar
      data={horizontalBarData}
      options={barOptions}
      height={null}
    />
  );
};

export const DoughnutChart = (props) => {
  const doughnutData = {
    labels: props.data.map((d) => d.label),
    datasets: [
      {
        label: props.title,
        data: props.data.map((d) => d.value),
        backgroundColor: props.color,
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: true,
    aspectRatio: 2,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    pieceLabel: {
      render: "value",
    },
    rotation: 0,
    title: {
      display: false,
      text: "Chart Title",
      fontSize: 15,
      responsive: false,
    },
    legend: {
      display: false,
      position: "right",
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 20,
      },
    },
    plugins: {
      datalabels: {
        labels: {
          name: {
            align: "end",
            anchor: "end",
            backgroundColor: null,
            borderColor: null,
            padding: 0,
            font: { size: 15 },
            formatter: function (labels, context) {
              let index = context.dataIndex;
              let label = context.chart.data.labels[index];
              return label === props.label1
                ? props.label1Icon + " " + props.label1
                : label === props.label2
                ? props.label2Icon + " " + props.label2
                : label === props.label3
                ? props.label3Icon + " " + props.label3
                : label === props.label4
                ? props.label4Icon + " " + props.label4
                : label === props.label5
                ? props.label5Icon + " " + props.label5
                : null;
            },
          },
        },
      },
    },
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

export const SankeyChart = (props) => {
  //constructorType="sankyChart"
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={props.sankeyOptions}
      // constructorType="sankyChart"
    />
  );
};
