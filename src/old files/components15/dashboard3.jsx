// Import react
import React, { Component } from "react";
import { readRemoteFile } from "react-papaparse";

import { SankeyChart } from "./subcomponents/sankeyDiagram";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

import { CategoryCard } from "./subcomponents/units";
import { ChartCard } from "./subcomponents/panel";
import { Tables } from "./subcomponents/table";
import { InfoText } from "./subcomponents/infoText";
import ResetButton from "./subcomponents/resetButton";

import {
  colors,
  CreateArrayAgencyType,
  CreateArrayAidCategory,
  CreateArrayAidType,
  CreateArrayDate,
  CreateArrayLocation,
  convertToString,
  convertValue,
  formatDate,
  getNewDataBeneficiary,
  getNewDataAidCategory,
  getNewDataAgency,
  getNewDataAidType,
  getNewDataLocation,
  lowerCase,
  oneDecimalPlace,
  parseIntegerMoney,
  sentenceCase,
} from "./subcomponents/functions";

class HorizontalBarChart extends Component {
  constructor(props) {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "horizontalBar",
      data: {
        labels: this.props.data.map((d) => sentenceCase(d.label)),
        datasets: [
          {
            title: this.props.title,
            label: this.props.title,
            data: this.props.data.map((d) => sentenceCase(d.value)),
            backgroundColor: "#10819e",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio: this.props.aspectRatio,
        responsive: true,
        legend: false,
        scales: {
          yAxes: [
            {
              ticks: {
                display: true,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: true,
                beginAtZero: true,
                maxTicksLimit: 5,
                callback: function (label) {
                  return "₱" + convertValue(label);
                },
              },
              gridLines: {
                display: true,
                drawBorder: false,
              },
              scaleLabel: {
                display: false,
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
                currentValue
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
          },
          titleFontSize: 14,
          bodyFontSize: 14,
          caretSize: 6,
          bodySpacing: 4,
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
        },
        mode: "nearest",
        intersect: true,
        onClick: this.props.handleChartClick,
      },
    });
  }
  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map((d) =>
      sentenceCase(d.label)
    );
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

class Timeline extends Component {
  constructor(props) {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    let newArray = [];
    let newArrayLabel = [];

    this.props.data.forEach(function (d) {
      newArray.push({
        t: d.label,
        y: d.value,
      });
      newArrayLabel.push(d.label);
    });

    const array = newArray.map((e) => e.y);

    const colours = (ctx) => {
      let value = ctx.dataset.data[ctx.dataIndex].y;
      return value < 0 ? "#99335F" : "#10819e";
    };

    this.myChart = new Chart(this.canvasRef.current, {
      type: "line",
      data: {
        labels: newArrayLabel,
        datasets: [
          {
            title: this.props.title,
            //label: this.props.title,
            data: newArray,
            fill: false,
            borderColor: "#10819e",
            backgroundColor: "#10819e",
            pointBorderColor: colours,
            pointBackgroundColor: colours,
            pointRadius: 2,
            borderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 2,
        responsive: true,
        legend: false,
        scales: {
          yAxes: [
            {
              ticks: {
                display: true,
                beginAtZero: true,
                suggestedMax: Math.max(...array) * 1.5,
                suggestedMin: Math.min(...array),
                maxTicksLimit: 5,
                callback: function (value) {
                  return "₱" + convertValue(value);
                },
                padding: 20,
              },
              gridLines: {
                display: true,
                drawBorder: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: true,
                maxTicksLimit: 6,
                maxRotation: 0,
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              type: "time",
              distribution: "series",
              time: {
                unit: "month",
                displayFormats: { month: "MMM D" },
                tooltipFormat: "ll",
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
              mode: "vertical",
              scaleID: "x-axis-0",
              value: 1, // Data value to draw the line at
              //endValue: 0, // Optional value at which the line draw should end
              borderWidth: 0,
              borderDash: [0, 100],
              label: {
                xAdjust: this.props.annotationXAdjustText1,
                yAdjust: this.props.annotationYAdjustText1,
                backgroundColor: "white",
                content: this.props.annotationText1,
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
              mode: "vertical",
              scaleID: "x-axis-0",
              value: 4, // Data value to draw the line at
              //endValue: 0, // Optional value at which the line draw should end
              borderWidth: 0,
              borderDash: [0, 100],
              label: {
                xAdjust: this.props.annotationXAdjustText2,
                yAdjust: this.props.annotationYAdjustText2,
                backgroundColor: "white",
                content: this.props.annotationText2,
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
          titleFontSize: 14,
          bodyFontSize: 14,
          caretSize: 6,
          bodySpacing: 4,
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
        },
        onClick: this.props.onClickEvent,
      },
    });
  }

  componentDidUpdate() {
    let newArray = [];
    let newArrayLabel = [];

    this.props.data.forEach(function (d) {
      newArray.push({
        t: d.label,
        y: d.value,
      });
      newArrayLabel.push(d.label);
    });

    this.myChart.data.labels = newArrayLabel;
    this.myChart.data.datasets[0].data = newArray;
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} height={this.props.height} />;
  }
}

class DoughnutChart extends Component {
  constructor(props) {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "doughnut",
      data: {
        labels: this.props.data.map((d) => d.label),
        datasets: [
          {
            title: this.props.title,
            data: this.props.data.map((d) => parseInt(d.value)),
            backgroundColor: colors,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio: 2,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 13,
            bottom: 6,
          },
        },
        rotation: 0,
        legend: {
          display: false,
          position: "right",
          reverse: false,
        },
        plugins: {
          datalabels: {
            labels: {
              name: {
                align: "end",
                anchor: "end",
                backgroundColor: null,
                borderColor: null,
                padding: 1,
                //font: { size: 14 },
                formatter: function (labels, ctx) {
                  let index = ctx.dataIndex;
                  let label = ctx.chart.data.labels[index];
                  let value = ctx.chart.data.datasets[0];

                  let total = value.data.reduce(function (
                    previousValue,
                    currentValue
                  ) {
                    return previousValue + currentValue;
                  });

                  let currentValue = value.data[index];

                  let percentage = oneDecimalPlace(
                    (currentValue / total) * 100
                  );
                  return label + ": " + percentage + "%";
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
                currentValue
              ) {
                return previousValue + currentValue;
              });

              let currentValue = value.data[tooltipItem.index];

              let percentage = oneDecimalPlace((currentValue / total) * 100);

              return [
                parseIntegerMoney(data.datasets[0].data[tooltipItem.index]),
                percentage + "% of total aid",
              ];
            },
          },
          titleFontSize: 14,
          bodyFontSize: 14,
          caretSize: 6,
          bodySpacing: 4,
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        onClick: this.props.handleChartClick,
      },
    });
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map((d) => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      menu: false,
      textData: [],
      data: [],
      channels: [],
      aidCategoryData: [],
      aidCategoryChannels: [],
      isClicked: false,
      isHover: false,
    };

    this.updateTextData = this.updateTextData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateChannels = this.updateChannels.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.handleOnHover = this.handleOnHover.bind(this);
  }
  handleOnError = (err) => {
    console.log(err);
  };

  componentDidMount() {
    readRemoteFile(require("../datasets/textData.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateTextData,
    });

    readRemoteFile(require("../datasets/mainData.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateData,
    });

    readRemoteFile(require("../datasets/sankeyData.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateChannels,
    });
  }

  updateTextData(result) {
    const data = result.data;
    this.setState({ textData: data });
  }

  updateData(result) {
    const data = result.data;
    this.setState({ data: data });
  }

  updateChannels(result) {
    const data = result.data;
    this.setState({ channels: data });
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  resetClick = () => {
    this.setState({ isClicked: false });
  };

  handleOnClick = (e, index, filterItem) => {
    this.setState({
      isClicked: index,
      aidCategoryData: getNewDataAidCategory(this.state.data, filterItem),
      aidCategoryChannels: getNewDataAidCategory(
        this.state.channels,
        filterItem
      ),
    });
    if (this.state.isClicked === index) {
      this.setState({ isClicked: !this.state.isClicked });
    }
  };

  handleChartClick = (e, activePoint) => {
    //e.preventDefault();
    /*const { datasets } = element[0]._chart.tooltip._data*/
    /*alert(datasets[dataIndex].labels);*/
    /*data["labels"][tooltipItem[0]["index"]];*/
    /*var label = myChart.data.labels[firstPoint._index];
    var value =
      myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];*/
    //console.log(datasets[datasetIndex].label[dataIndex]);
    /*[datasets[datasetIndex].data[dataIndex]*/
    /*chart.data.datasets[datasetIndex].data[dataIndex] = value;*/
    /*var label = chart.data.datasets[i].label;*/
    /*datasets[dataIndex].label)*/
    //START
    const { datasets } = activePoint[0]._chart.tooltip._data;
    if (activePoint[0]._chart !== undefined) {
      console.log(datasets);
      const datasetIndex = activePoint[0]._datasetIndex;
      const dataIndex = activePoint[0]._index;
      const itemClicked = datasets[datasetIndex].label[dataIndex];
      const filterType = datasets[datasetIndex].title;
      console.log(datasets.length);
      this.setState({
        isClicked: true,
        aidCategoryData:
          filterType === "agency"
            ? getNewDataAgency(this.state.data, itemClicked)
            : filterType === "aidType"
            ? getNewDataAidType(this.state.data, itemClicked)
            : filterType === "agency"
            ? getNewDataAgency(this.state.data, itemClicked)
            : filterType === "location"
            ? getNewDataLocation(this.state.data, itemClicked)
            : null,
        /*aidCategoryLocation:
          filterType === "aidType"
            ? getNewDataAidType(this.state.location, itemClicked)
            : filterType === "agency"
            ? getNewDataAgency(this.state.location, itemClicked)
            : //: filterType === "location"
              //? getNewDataLocation(this.state.location, itemClicked)
              null,*/
        /*aidCategoryChannels:
        filterType === "aidType"
          ? getNewDataAidType(this.state.channels, itemClicked)
          : filterType === "agency"
          ? getNewDataAgency(this.state.channels, itemClicked)
          : null,*/
      });
    } else {
      return console.log("return");
    }
  };

  handleOnHover = (index) => {
    this.setState({
      isHover: index,
    });
    if (this.state.isHover === index) {
      this.setState({ isHover: false });
    }
  };

  render() {
    const createSankeyData = (data) => {
      let array = [];
      data.map((d) => array.push(new Array(d.from, d.to, parseInt(d.weight))));
      return array;
    };
    const getTextInput = (inputCode) => {
      return this.state.textData
        .filter(({ textType }) => textType === convertToString(inputCode))
        .map((item) => item.text);
    };
    const totalAid = this.state.data.reduce(
      (total, item) => total + parseFloat(item.value),
      0
    );

    return (
      <React.Fragment>
        <div className="container-fluid mb-2">
          <div className="row p-0 m-0">
            <div className="col-lg-6 col-md-6 p-0 m-0 order-1">
              <div className="row p-0 m-0 align-items-center">
                <div className="col-lg-7 col-md-12 m-0 p-0 order-1">
                  <div className="row m-0">
                    <div className="col-12 m-0">
                      <p className="">{getTextInput("panel1_text1")}</p>
                    </div>
                    <div className="col m-0 p-0 order-1">
                      <div className="row align-items-center m-0 p-0">
                        <div className="col">
                          <h4 className="">{getTextInput("panel1_amount1")}</h4>
                          <p className="m-0 small">
                            {getTextInput("panel1_source1")}
                          </p>
                          <p>
                            <span className="small">
                              (as of{" "}
                              {formatDate(getTextInput("panel1_source1_asOf"))}){" "}
                            </span>
                            <InfoText infoText={getTextInput("infotext1")} />
                          </p>
                        </div>
                        <div className="col-1 text-center p-0 m-0">
                          <p>and</p>
                        </div>
                        <div className="col">
                          <h4 className="">{getTextInput("panel1_amount2")}</h4>
                          <p className="p-0 m-0 small">
                            {getTextInput("panel1_source2")}
                          </p>
                          <p>
                            <span className="small">
                              (as of{" "}
                              {formatDate(getTextInput("panel1_source2_asOf"))}){" "}
                            </span>
                            <InfoText infoText={getTextInput("infotext2")} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 p-0 pl-2 m-0 order-2">
                  <ChartCard
                    cardTitle={getTextInput("panel2_text1")}
                    cardSubTitle={""}
                    cardContent={
                      <React.Fragment>
                        <h1 className="text-pelorous font-weight-bold m-0 p-0">
                          <span className="small">₱</span>
                          {convertValue(totalAid)}
                        </h1>
                        <p className="p-0 m-0">
                          {getTextInput("panel2_text2")}{" "}
                          <InfoText infoText={getTextInput("infotext3")} />
                        </p>
                      </React.Fragment>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 p-0 m-0 order-2">
              <ChartCard
                cardTitle={getTextInput("panel3_heading")}
                cardContent={
                  <div className="row px-2">
                    {CreateArrayAidCategory(this.state.data).map((item) => (
                      <CategoryCard
                        key={item.index}
                        categoryName={item.aidCategory}
                        categoryAmount={item.value}
                        className={
                          this.state.isClicked === item.index ||
                          this.state.isHover === item.index
                            ? "border-info border-4"
                            : "border-light"
                        }
                        additionalNotes={
                          oneDecimalPlace((item.value / totalAid) * 100) +
                          "% of total aid"
                        }
                        onClickEvent={() =>
                          this.handleOnClick(item.index, item.aidCategory)
                        }
                        onHoverEvent={() => this.handleOnHover(item.index)}
                      />
                    ))}
                  </div>
                }
              />
            </div>
            <div className="col-lg-12 col-md-12 p-0 m-0 order-3">
              <ChartCard
                cardTitle={getTextInput("panel4_heading")}
                cardSubTitle={""}
                cardContent={
                  <Timeline
                    height={180}
                    title={"date"}
                    data={
                      this.state.isClicked
                        ? CreateArrayDate(this.state.aidCategoryData)
                        : CreateArrayDate(this.state.data)
                    }
                    annotationText1="March 16:"
                    annotationXAdjustText1={-28}
                    annotationYAdjustText1={-6}
                    annotationText2="Lockdown in Luzon"
                    annotationXAdjustText2={-110}
                    annotationYAdjustText2={-6}
                  />
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 p-0 m-0 order-4">
              <ChartCard
                cardTitle={getTextInput("panel5_heading")}
                cardSubTitle={""}
                cardContent={
                  <React.Fragment>
                    <div className="p-0">
                      <HorizontalBarChart
                        title={"aidType"}
                        data={
                          this.state.isClicked
                            ? CreateArrayAidType(this.state.aidCategoryData)
                            : CreateArrayAidType(this.state.data)
                        }
                        aspectRatio={2}
                        handleChartClick={this.handleChartClick}
                      />
                    </div>
                    <ResetButton
                      onClick={this.resetClick}
                      className={
                        this.state.isClicked
                          ? "my-2 btn btn-secondary shadow"
                          : "d-none"
                      }
                    />
                  </React.Fragment>
                }
                notes={""}
                /*sources={getTextInput("panel5_sources")} */
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 p-0 m-0 order-5">
              <ChartCard
                cardTitle={getTextInput("panel6_heading")}
                cardSubTitle={""}
                cardContent={
                  <React.Fragment>
                    <DoughnutChart
                      title={"agency"}
                      data={
                        !this.state.isClicked
                          ? CreateArrayAgencyType(this.state.data)
                          : CreateArrayAgencyType(this.state.aidCategoryData)
                      }
                      handleChartClick={this.handleChartClick}
                    />
                    <ResetButton
                      onClick={this.resetClick}
                      className={
                        this.state.isClicked
                          ? "my-2 btn btn-secondary shadow"
                          : "d-none"
                      }
                    />
                  </React.Fragment>
                }
              />
            </div>
            <div className="col-lg-4 col-md-12 p-0 m-0 order-6">
              <ChartCard
                cardTitle="How is aid delivered"
                cardSubTitle={""}
                cardContent={
                  <React.Fragment>
                    <SankeyChart
                      height={200}
                      data={
                        !this.state.isClicked
                          ? createSankeyData(this.state.channels)
                          : createSankeyData(this.state.aidCategoryChannels)
                      }
                    />
                  </React.Fragment>
                }
              />
            </div>
            <div className="col-lg-8 col-md-7 p-0 m-0 order-7">
              <ChartCard
                cardTitle={getTextInput("panel7_heading")}
                cardSubTitle={""}
                cardContent={
                  <React.Fragment>
                    <div className="p-0 m-0">
                      <Tables
                        data={
                          !this.state.isClicked
                            ? this.state.data
                            : this.state.aidCategoryData
                        }
                        onClick={(e) => {
                          const itemClicked = lowerCase(e.target.innerHTML);
                          this.setState({
                            isClicked: true,
                            aidCategoryData: getNewDataBeneficiary(
                              this.state.data,
                              itemClicked
                            ),
                          });
                        }}
                      />
                    </div>
                    <ResetButton
                      onClick={this.resetClick}
                      className={
                        this.state.isClicked
                          ? "my-2 btn btn-secondary shadow"
                          : "d-none"
                      }
                    />
                  </React.Fragment>
                }
                notes={""}
                sources={getTextInput("panel7_sources")}
              />
            </div>
            <div className="col-lg-4 col-md-5 p-0 m-0 order-8">
              <ChartCard
                cardTitle={getTextInput("panel8_heading")}
                cardSubTitle={""}
                cardContent={
                  <React.Fragment>
                    <div className="p-0">
                      <HorizontalBarChart
                        title={"location"}
                        data={
                          this.state.isClicked
                            ? CreateArrayLocation(this.state.aidCategoryData)
                            : CreateArrayLocation(this.state.data)
                        }
                        aspectRatio={1}
                        handleChartClick={this.handleChartClick}
                      />
                    </div>
                    <ResetButton
                      onClick={this.resetClick}
                      className={
                        this.state.isClicked
                          ? "my-2 btn btn-secondary shadow"
                          : "d-none"
                      }
                    />
                  </React.Fragment>
                }
                notes={""}
                sources={getTextInput("panel8_sources")}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
