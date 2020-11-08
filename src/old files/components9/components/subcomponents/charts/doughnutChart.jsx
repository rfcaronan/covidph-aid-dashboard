// Import React DOM
import React from "react";

// Import chart dependencies
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

// Import functions
import { greeting, waveHello, convertValue } from "../functions";

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
    onClick: props.handleClickEvent,
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};
