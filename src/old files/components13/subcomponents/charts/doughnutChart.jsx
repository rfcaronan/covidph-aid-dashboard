// Import React DOM
import React from "react";

// Import chart dependencies
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

// Import functions
import { colors, titleCase, parseIntegerMoney } from "../functions";

export const DoughnutChart = (props, any) => {
  let arrayData = props.data;
  let sortedArrayData = arrayData.sort(function (a, b) {
    return b.value - a.value;
  });

  let newArrayData = [];
  sortedArrayData.forEach(function (d) {
    newArrayData.push({
      index: d.index,
      title: d.label,
      label: d.label,
      data: d.value,
    });
  });

  const doughnutData = {
    labels: newArrayData.map((d) => titleCase(d.label)),
    datasets: [
      {
        title: props.title,
        label: newArrayData.map((d) => titleCase(d.label)),
        data: newArrayData.map((d) => parseInt(d.data)),
        backgroundColor: props.colors,
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: props.maintainAspectRatio,
    aspectRatio: props.aspectRatio,
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
      text: props.chartTitle,
      fontSize: 15,
      responsive: true,
    },
    legend: {
      display: true,
      position: "right",
      reverse: false,
    },

    //https://www.chartjs.org/docs/latest/configuration/legend.html#html-legends
    /*legendCallback: function (chart) {
      var text = [];
      text.push('<ul class="' + chart.id + '-legend">');
      var data = chart.data;
      var datasets = data.datasets;
      var labels = data.labels;
      if (datasets.length) {
        for (var i = 0; i < datasets[0].data.length; ++i) {
          text.push(
            '<li><span style="background-color:' +
              datasets[0].backgroundColor[i] +
              '"></span>'
          );
          if (labels[i]) {
            // calculate percentage
            var total = datasets[0].data.reduce(function (
              previousValue,
              currentValue,
              currentIndex,
              array
            ) {
              return previousValue + currentValue;
            });
            var currentValue = datasets[0].data[i];
            var percentage = Math.floor((currentValue / total) * 100 + 0.5);

            text.push(labels[i] + " (" + percentage + "%)");
          }
          text.push("</li>");
        }
      }
      text.push("</ul>");
      return text.join("");
    },*/
    plugins: {
      datalabels: {
        labels: {
          name: {
            align: "end",
            anchor: "end",
            backgroundColor: null,
            borderColor: null,
            padding: 4,
            //font: { size: 15 },
            formatter: function (labels, context) {
              let index = context.dataIndex;
              let label = context.chart.data.labels[index];
              return null; /*=== props.label1
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
    //events: ["mousemove"], // this is needed, otherwise onHover is not fired
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? "pointer" : "default";
    },
    tooltips: {
      /* documentation: https://www.chartjs.org/docs/latest/developers/api.html#getelementatevente */
      callbacks: {
        title: function (tooltipItem, data) {
          /* var label = myChart.data.labels[firstPoint._index];*/
          return data.labels[tooltipItem[0].index];
        },
        label: function (tooltipItem, data) {
          /* var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];*/
          let value = data.datasets[tooltipItem.datasetIndex];

          let total = value.data.reduce(function (
            previousValue,
            currentValue,
            currentIndex,
            array
          ) {
            return previousValue + currentValue;
          });

          let currentValue = value.data[tooltipItem.index];

          let precentage = parseFloat((currentValue / total) * 100).toFixed(1);

          return [
            parseIntegerMoney(data.datasets[0].data[tooltipItem.index]),
            precentage + "%",
          ];
        },
      },
      borderColor: "rgba(175, 59, 110)",
      borderWidth: 1.8,
      cornerRadius: 0,
      backgroundColor: "white",
      titleFontSize: 14,
      titleFontColor: "rgba(0,0,0)",
      bodyFontColor: "rgba(0,0,0)",
      bodyFontSize: 14,
      caretSize: 6,
      bodySpacing: 4,
      xPadding: 8,
      yPadding: 8,
      displayColors: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
      //position: "nearest",
    },
    onClick: props.handleChartClick,
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};
