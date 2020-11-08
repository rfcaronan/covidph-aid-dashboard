import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

export class BarChart extends React.Component {
  render() {
    const barData = {
      labels: this.props.data.map((d) => d.label),
      datasets: [
        {
          label: this.props.title,
          data: this.props.data.map((d) => d.value),
          backgroundColor: this.props.color,
        },
      ],
    };
    const barOptions = {
      maintainAspectRatio: this.props.maintainAspectRatio,
      responsive: this.props.responsive,
      legend: this.props.legend,
      scales: {
        yAxes: [
          {
            ticks: {
              display: true,
              beginAtZero: true,
              suggestedMax: 100,
              maxTicksLimit: 6,
              lineHeight: 2,
            },
            gridLines: {
              display: true,
              borderDash: [8, 4],
            },
            scaleLabel: {
              display: true,
              labelString: "Y-axes",
              fontColor: "red",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: false,
              labelString: "X-axes",
              fontColor: "red",
            },
          },
        ],
      },
    };

    return <Bar data={barData} options={barOptions} />;
  }
}

export class DoughnutChart extends Component {
  render() {
    const doughnutData = {
      labels: this.props.data.map((d) => d.label),
      datasets: [
        {
          label: this.props.title,
          data: this.props.data.map((d) => d.value),
          backgroundColor: this.props.color,
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
        display: true,
        position: "right",
      },
      plugins: {
        datalabels: {
          align: "end",
          anchor: "end",
          backgroundColor: null,
          borderColor: null,
          borderRadius: 0,
          borderWidth: 0,
          color: "#777",
          font: {
            size: 12,
          },
          offset: 0,
          padding: 0,
          formatter: function (value, context) {
            return context.chart.data1.labels[context.dataIndex] || null;
          },
        },
      },
    };

    return <Doughnut data={doughnutData} options={doughnutOptions} />;
  }
}
