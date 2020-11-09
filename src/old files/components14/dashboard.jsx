// Import react
import React, { Component } from "react";

// Import parser
import { readRemoteFile } from "react-papaparse";

// Import sub-components for layout
import { CategoryCard } from "./subcomponents/cards/units";
import { ChartCard } from "./subcomponents/cards/panel";
import { Tables } from "./subcomponents/cards/table";
import { TablesForTabs } from "./subcomponents/cards/tableTabs";
import { InfoText } from "./subcomponents/cards/infoText";
import { OverlayTooltip } from "./subcomponents/cards/tooltip";

// Import chart components
import { Timeline } from "./subcomponents/charts/timeline";
import { HorizontalBarChart } from "./subcomponents/charts/horizontalBarChart";
import { DoughnutChart } from "./subcomponents/charts/doughnutChart";
import { SankeyChart } from "./subcomponents/charts/sankeyDiagram";

// Import sub-components for data and functions
import {
  colors,
  convertValue,
  convertToString,
  CategoryValue,
  calculatePercent,
  titleCase,
  lowerCase,
  CreateArrayDate,
  CreateArrayAidCategory,
  CreateArrayAidType,
  CreateArrayBeneficiaryType,
  CreateArrayBeneficiaryCategory,
  CreateArrayAgencyType,
  CreateArrayLocation,
  getNewDataBeneficiary,
  getNewDataAidCategory,
  getNewDataAidType,
  getNewDataAgency,
  getNewDataLocation,
  parseInteger,
  CreateArrayChannels,
  parseIntegerMoney,
  convertValueNoDecimal,
  oneDecimalPlace,
} from "./subcomponents/functions";

// Import other dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

class Dashboard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      menu: false,
      textData: [],
      data: [],
      //location: [],
      channels: [],
      aidCategoryData: [],
      //aidCategoryLocation: [],
      aidCategoryChannels: [],
      isClicked: false,
      isHover: false,
    };

    this.updateTextData = this.updateTextData.bind(this);
    this.updateData = this.updateData.bind(this);
    /*this.updateLocation = this.updateLocation.bind(this);*/
    this.updateChannels = this.updateChannels.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.resetClick = this.resetClick.bind(this);
    //this.handleOnClickChart = this.handleOnClickChart(this);
    this.handleOnHover = this.handleOnHover.bind(this);
  }
  handleOnError = (err) => {
    console.log(err);
  };

  componentWillMount() {
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

    /*readRemoteFile(require("../location.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateLocation,
    });*/

    readRemoteFile(require("../sankeyData.csv"), {
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

  /*updateLocation(result) {
    const data = result.data;
    this.setState({ location: data });
  }*/

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

  handleOnClick = (index, filterItem) => {
    //e.preventDefault();
    //let aidCategoryItemClicked = e.target.childNodes[0].nodeValue;
    this.setState({
      isClicked: index,
      aidCategoryData: getNewDataAidCategory(this.state.data, filterItem),
      /*aidCategoryLocation: getNewDataAidCategory(
        this.state.location,
        filterItem
      ),*/
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

    // Get text input from the data
    const getTextInput = (inputCode) => {
      return this.state.textData
        .filter(({ textType }) => textType === convertToString(inputCode))
        .map((item) => item.text);
    };

    const show = this.state.menu ? "show bg-white" : "";
    const hide = this.state.menu ? "" : "show";

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
                              (as of {getTextInput("panel1_source1_asOf")}){" "}
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
                              (as of {getTextInput("panel1_source2_asOf")}){" "}
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
                          {/* {getTextInput("panel2_amount1")} */}
                          {/* Get sum of all numbers in value column */}
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
            <div className="col-lg-12 col-md-12 p-0 m-0 order-3">
              <ChartCard
                cardTitle={getTextInput("panel4_heading")}
                cardSubTitle={""}
                cardContent={
                  <Timeline
                    height={180}
                    title="date"
                    data={
                      this.state.isClicked
                        ? CreateArrayDate(this.state.aidCategoryData)
                        : CreateArrayDate(this.state.data)
                    }
                    //borderColor="#10819e"
                    //backgroundColor="#10819e"
                    maintainAspectRatio={false}
                    aspectRatio={2}
                    responsive={true}
                    xAxesDisplayGridLines={true}
                    yAxesLineHeight={2}
                    yAxesBeginAtZero={false}
                    yAxesDisplayTicks={true}
                    xAxesDisplayTicks={true}
                    yAxesMaxTicksLimit={5}
                    xAxesMaxTicksLimit={6}
                    yAxesCallback={function (value) {
                      return "₱" + convertValue(value);
                    }}
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

            <div className="col-lg-6 col-md-6 col-sm-12 p-0 m-0 order-2">
              <ChartCard
                cardTitle={getTextInput("panel3_heading")}
                cardContent={
                  <div className="row px-2">
                    {CreateArrayAidCategory(this.state.data).map((item) => (
                      <CategoryCard
                        key={item.index}
                        srcCategory={require("../photos/" +
                          item.aidCategoryCode +
                          ".png")}
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
                        color="#10819e"
                        maintainAspectRatio={true}
                        aspectRatio={2}
                        responsive={true}
                        legend={false}
                        xAxesBeginAtZero={true}
                        //xAxesStepSize={10000}
                        yAxesDisplayTicks={true}
                        xAxesDisplayTicks={true}
                        //yAxesMaxTicksLimit={1000}
                        //onClickEvent={this.handleChartClick}
                        xAxesDisplayGridLines={true}
                        handleChartClick={this.handleChartClick}
                      />
                    </div>
                    <button
                      onClick={this.resetClick}
                      type="button"
                      className={
                        this.state.isClicked
                          ? "my-2 btn btn-secondary shadow"
                          : "d-none"
                      }
                    >
                      Clear filter
                    </button>
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
                      color="#10819e"
                      maintainAspectRatio={true}
                      //onClickEvent={this.handleChartClick}
                      handleChartClick={this.handleChartClick}
                      colors={!this.state.isClicked ? colors : null}
                    />
                    <button
                      onClick={this.resetClick}
                      className={
                        this.state.isClicked
                          ? "my-2 btn btn-secondary shadow"
                          : "d-none"
                      }
                    >
                      Clear filter
                    </button>
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
                      <TablesForTabs
                        data={
                          !this.state.isClicked
                            ? this.state.data
                            : this.state.aidCategoryData
                        }
                        onClick={(e) => {
                          //e.preventDefault();
                          const itemClicked = lowerCase(e.target.innerHTML);
                          console.log(itemClicked);

                          this.setState({
                            isClicked: true,
                            aidCategoryData: getNewDataBeneficiary(
                              this.state.data,
                              itemClicked
                            ),
                            /*aidCategoryLocation: getNewDataBeneficiary(
                              this.state.location,
                              itemClicked
                            ),*/
                            //aidCategoryChannels: getNewDataBeneficiary(this.state.data, itemClicked),
                          });
                        }}
                      />

                      {/*<Tabs id="tab" defaultActiveKey={0} className="text-pelorous">
                      {CreateArrayBeneficiaryCategory(
                        !this.state.isClicked
                          ? this.state.data
                          : this.state.aidCategoryData
                      ).map((item, i) => (
                        <Tab
                          key={item.label}
                          eventKey={item.label}
                          title={
                            <OverlayTooltip
                              tooltipText={item.label}
                              tooltipObject={item.label}
                              icon={
                                <FontAwesomeIcon icon={item.link} size={"md"} />
                              }
                            />
                          }
                        >
                          <TablesForTabs
                            data={
                              !this.state.isClicked
                                ? this.state.data
                                : this.state.aidCategoryData
                            }
                            beneficiaryCategory={item.label}
                          />
                        </Tab>
                      ))}
                          </Tabs>*/}
                    </div>
                    <button
                      onClick={this.resetClick}
                      className={
                        this.state.isClicked
                          ? "my-2 mx-0 btn btn-secondary shadow"
                          : "d-none"
                      }
                    >
                      Clear filter
                    </button>
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
                    <HorizontalBarChart
                      title={"location"}
                      data={
                        this.state.isClicked
                          ? CreateArrayLocation(this.state.aidCategoryData)
                          : CreateArrayLocation(this.state.data)
                      }
                      color="#10819e"
                      maintainAspectRatio={true}
                      aspectRatio={1}
                      responsive={true}
                      legend={false}
                      xAxesBeginAtZero={true}
                      //xAxesStepSize={10000}
                      yAxesDisplayTicks={true}
                      xAxesDisplayTicks={true}
                      //yAxesMaxTicksLimit={1000}
                      xAxesMaxTicksLimit={5}
                      xAxesDisplayGridLines={true}
                      handleChartClick={this.handleChartClick}
                    />
                    <button
                      onClick={this.resetClick}
                      className={
                        this.state.isClicked
                          ? "my-2 btn btn-secondary shadow"
                          : "d-none"
                      }
                    >
                      Clear filter
                    </button>
                  </React.Fragment>
                }
                notes={""}
                sources={getTextInput("panel8_sources")}
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
                    {/*<button
                      onClick={this.resetClick}
                      className={
                        this.state.isClicked
                          ? "mt-1 m-0 btn btn-secondary"
                          : "mt-1 m-0 btn btn-secondary disabled"
                      }
                    >
                      Reset
                    </button>*/}
                  </React.Fragment>
                }
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;