// Import React DOM
import React from "react";

// Import chart dependencies
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

// Import functions
import { colors, titleCase } from "../functions";

export const DoughnutChart = (props) => {
  const doughnutData = {
    labels: props.data.map((d) => titleCase(d.label)),
    datasets: [
      {
        label: props.title,
        data: props.data.map((d) => parseInt(d.value)),
        backgroundColor: colors,
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
        top: 25,
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
            //padding: 1,
            //font: { size: 15 },
            formatter: function (labels, context) {
              let index = context.dataIndex;
              let label = context.chart.data.labels[index];
              return label; /*=== props.label1
                ? props.label1 + " " + props.label1Icon
                : label === props.label2
                ? props.label2 + " " + props.label2Icon
                : label === props.label3
                ? props.label3 + " " + props.label3Icon
                : label === props.label4
                ? props.label4 + " " + props.label4Icon
                : label === props.label5
                ? props.label5 + " " + props.label5Icon
                : null;*/
            },
          },
        },
      },
    },
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          return data["labels"][tooltipItem[0]["index"]];
        },
        label: function (tooltipItem, data) {
          return (
            "₱" +
            data["datasets"][0]["data"][tooltipItem["index"]].toLocaleString()
          );
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
      displayColors: true,
      //mode: "point",
    },
    onClick: props.handleClickEvent,
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};
