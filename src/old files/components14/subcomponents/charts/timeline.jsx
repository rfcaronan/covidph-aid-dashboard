// Import React DOM
import React from "react";
import moment from "moment";

// Import chart dependencies
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";
import { Chart } from "react-google-charts";

// Import functions
import { convertValue } from "../functions";

/*export const Timeline = (props) => {
  let newArrayData = [];
  newArrayData.push(["", "Value"]);
  props.data.map((d) => newArrayData.push(new Array(d.label, d.value)));

  console.log(newArrayData);

  return (
    <Chart
      //width={"500px"}
      //height={"300px"}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={newArrayData}
      height={170}
      options={{
        // Material design options
        colors: ["#0D98BA"],
        legend: { position: "none" },
        hAxis: {
          title: "",
          textPosition: "none",
          gridlines: { color: "transparent" },
        },
        vAxis: { format: "P" + "currency" },
        gridlines: { color: "transparent" },
        /*chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
      }}
    />
  );
};*/

export const Timeline = (props) => {
  let newArray = [];
  let newArrayLabel = [];

  props.data.forEach(function (d) {
    newArray.push({
      t: d.label,
      y: d.value,
    });
    newArrayLabel.push(d.label);
  });
  //https://github.com/chartjs/Chart.js/issues/1493
  const colours = newArray.map((d) => (d.y < 0 ? "#99335F" : "#10819e"));
  const barData = {
    //labels: props.xLabel.map((d) => moment(d).format("MMMM DD")),
    labels: newArrayLabel,
    datasets: [
      {
        title: props.title,
        //label: newArrayLabel,
        data: newArray,
        fill: false,
        borderColor: "#10819e",
        backgroundColor: "#10819e",
        pointBorderColor: colours,
        pointBackgroundColor: colours,
      },
    ],
  };

  const array = newArray.map((e) => parseFloat(e.y));

  const barOptions = {
    maintainAspectRatio: props.maintainAspectRatio,
    aspectRatio: props.aspectRatio,
    responsive: props.responsive,
    legend: false,
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
            suggestedMax: Math.max(...array) * 1.5,
            maxTicksLimit: props.yAxesMaxTicksLimit,
            precision: props.yAxesPrecision,
            lineHeight: props.yAxesLineHeight,
            stepSize: props.yAxesStepSize,
            callback: props.yAxesCallback,
            padding: 20,
          },
          gridLines: {
            display: true,
            borderDash: props.yAxesBorderDash,
            drawBorder: false,
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
            maxTicksLimit: props.xAxesMaxTicksLimit,
            //Turn autoSkip off to show all labels no matter what.
            //autoSkip: false,
            //This can cause labels at the edges to be cropped by the edge of the canvas
            //labelOffset: 20,
            maxRotation: 0,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: props.xAxesDisplayScaleLabel,
            labelString: props.xAxesLabelString,
            fontColor: props.xAxesFontColorScaleLabel,
          },
          type: "time",
          autoSkip: false,
          distribution: "series",
          time: {
            unit: "month",
            displayFormats: { month: "MMM DD" },
            //unitStepSize: 200,
            tooltipFormat: "ll",
          },
          //max: "08/31/2020",
          //min: "01/01/2020",
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
            xAdjust: props.annotationXAdjustText1,
            yAdjust: props.annotationYAdjustText1,
            backgroundColor: "white",
            content: props.annotationText1,
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
          //id: "vLine",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: 4, // Data value to draw the line at
          //endValue: 0, // Optional value at which the line draw should end
          borderWidth: 0,
          borderDash: [0, 100],
          label: {
            xAdjust: props.annotationXAdjustText2,
            yAdjust: props.annotationYAdjustText2,
            backgroundColor: "white",
            content: props.annotationText2,
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
    onClick: props.onClickEvent,
  };

  return <Line data={barData} options={barOptions} height={props.height} />;
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
