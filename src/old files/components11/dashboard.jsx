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

// Import sub-components for data and functions
import {
  convertValue,
  convertToString,
  CategoryValue,
  calculatePercent,
  CreateArrayAidCategory,
  CreateArrayAidType,
  CreateArrayBeneficiaryType,
  CreateArrayAgencyType,
  CreateArrayLocation,
  getNewData,
  parseInteger,
  CreateArrayChannels,
} from "./subcomponents/functions";

// Import chart components
import { BarChart } from "./subcomponents/charts/barChart";
import { HorizontalBarChart } from "./subcomponents/charts/horizontalBarChart";
import { DoughnutChart } from "./subcomponents/charts/doughnutChart";
import { SankeyChart } from "./subcomponents/charts/sankeyDiagram";

// Import other dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textData: [],
      data: [],
      location: [],
      channels: [],
      aidCategoryData: [],
      aidCategoryLocation: [],
      aidCategoryChannels: [],
      isClicked: false,
      isHover: false,
    };

    this.updateTextData = this.updateTextData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateChannels = this.updateChannels.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnHover = this.handleOnHover.bind(this);
  }
  handleOnError = (err) => {
    console.log(err);
  };

  componentWillMount() {
    readRemoteFile(require("../textData.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateTextData,
    });

    readRemoteFile(require("../mainData.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateData,
    });

    readRemoteFile(require("../location.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateLocation,
    });

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

  updateLocation(result) {
    const data = result.data;
    this.setState({ location: data });
  }

  updateChannels(result) {
    const data = result.data;
    this.setState({ channels: data });
  }

  handleOnClick = (index, filteredBy) => {
    //e.preventDefault();
    //let aidCategoryItemClicked = e.target.childNodes[0].nodeValue;
    this.setState({
      isClicked: index,
      aidCategoryData: getNewData(this.state.data, filteredBy),
      aidCategoryLocation: getNewData(this.state.location, filteredBy),
      aidCategoryChannels: getNewData(this.state.channels, filteredBy),
    });
    if (this.state.isClicked === index) {
      this.setState({ isClicked: !this.state.isClicked });
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

    let name = createSankeyData(this.state.channels);
    console.log(name);

    // Get text input from the data
    const getTextInput = (inputCode) => {
      return this.state.textData
        .filter(({ textType }) => textType === convertToString(inputCode))
        .map((item) => item.text);
    };

    // Filter this.state.data to generate total value for each aid category
    const aidCategoryFiltered = CreateArrayAidCategory(this.state.data);

    return (
      <React.Fragment>
        {/* Panels 1, 2 */}
        <div className="container-fluid mb-2">
          <div className="row p-0 text-center align-items-center">
            <div className="col-lg col-md-12 p-0 order-2">
              <ChartCard
                cardTitle={getTextInput("panel2_text1")}
                cardSubTitle={""}
                cardContent={
                  <React.Fragment>
                    <h1 className="display-4 text-info font-weight-bold">
                      <span className="small font-weight-bold">₱</span>
                      {getTextInput("panel2_amount1")}
                    </h1>
                    <p className="p-2 m-0">
                      {getTextInput("panel2_text2")}{" "}
                      <InfoText infoText={getTextInput("infotext3")} />
                    </p>
                  </React.Fragment>
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 p-2 order-1">
              <div className="row">
                <div className="col">
                  <h6>{getTextInput("panel1_text1")}</h6>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col">
                  <h2 className="">{getTextInput("panel1_amount1")}</h2>
                  <p className="p-0 m-0 small">
                    {getTextInput("panel1_source1")}
                  </p>
                  <p className="small">
                    (as of {getTextInput("panel1_source1_asOf")}){" "}
                    <InfoText infoText={getTextInput("infotext1")} />
                  </p>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-12 p-0 m-0">
                  <p>and</p>
                </div>
                <div className="col">
                  <h2 className="">{getTextInput("panel1_amount2")}</h2>
                  <p className="p-0 m-0 small">
                    {getTextInput("panel1_source2")}
                  </p>
                  <p className="small">
                    (as of {getTextInput("panel1_source2_asOf")}){" "}
                    <InfoText infoText={getTextInput("infotext2")} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mb-2">
          <div className="row p-0">
            <div className="col-12 p-0 order-1">
              <ChartCard
                cardTitle={getTextInput("panel3_heading")}
                cardSubTitle={
                  <React.Fragment>
                    {getTextInput("panel3_subheading")}{" "}
                    <InfoText infoText={getTextInput("infotext4")} />
                  </React.Fragment>
                }
                cardContent={
                  <div className="row px-2">
                    {aidCategoryFiltered.map((item) => (
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
            <div className="col-12 h-100 p-0 order-2">
              <ChartCard
                cardTitle={getTextInput("panel4_heading")}
                cardSubTitle={""}
                cardContent={
                  <BarChart
                    yLabel={
                      this.state.isClicked
                        ? this.state.aidCategoryData.map((d) => d.value)
                        : this.state.data.map((d) => d.value)
                    }
                    xLabel={
                      this.state.isClicked
                        ? this.state.aidCategoryData.map((d) => d.date)
                        : this.state.data.map((d) => d.date)
                    }
                    color="#17a2b8"
                    maintainAspectRatio={false}
                    aspectRatio={2}
                    responsive={true}
                    legend={false}
                    yAxesDisplayScaleLabel={false}
                    yAxesLineHeight={2}
                    yAxesDrawBorder={false}
                    yAxesDisplayGridLines={false}
                    xAxesDrawBorder={false}
                    xAxesDisplayGridLines={false}
                    yAxesBeginAtZero={true}
                    yAxesDisplayTicks={true}
                    xAxesDisplayTicks={true}
                    //yAxesSuggestedMax={3500000000}
                    //yAxesStepSize={5000}
                  />
                }
              />
            </div>
            <div className="col-lg-8 col-md-12 p-0 m-0 order-3">
              <ChartCard
                cardTitle={getTextInput("panel5_heading")}
                cardSubTitle={""}
                cardContent={
                  <React.Fragment>
                    <div className="p-0">
                      <DoughnutChart
                        data={
                          this.state.isClicked
                            ? CreateArrayAidType(this.state.aidCategoryData)
                            : CreateArrayAidType(this.state.data)
                        }
                        maintainAspectRatio="false"
                      />
                    </div>

                    <div className="p-0">
                      <Tabs /*defaultActiveKey={this}*/ className="text-info">
                        {CreateArrayAidType(
                          !this.state.isClicked
                            ? this.state.data
                            : this.state.aidCategoryData
                        ).map((item, i) => (
                          <Tab
                            key={i}
                            eventKey={item.label}
                            title={
                              <OverlayTooltip
                                tooltipText={item.label}
                                tooltipObject={
                                  <FontAwesomeIcon
                                    icon={item.link}
                                    size={"md"}
                                  />
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
                              aidType={item.label}
                            />
                          </Tab>
                        ))}
                      </Tabs>
                    </div>
                  </React.Fragment>
                }
              />
            </div>

            <div className="col-lg-4 col-md-12 p-0 m-0 order-4">
              <ChartCard
                cardTitle="Who implements aid"
                cardSubTitle={""}
                cardContent={
                  <Tables
                    tableHeader={
                      <tr>
                        <th scope="col">Agency</th>
                        <th scope="col">Used</th>
                        <th scope="col">Status</th>
                      </tr>
                    }
                    tableBody={CreateArrayAgencyType(
                      !this.state.isClicked
                        ? this.state.data
                        : this.state.aidCategoryData
                    ).map((item, index) => (
                      <tr key={item.index}>
                        <td className="text-info">
                          {item.label} {}
                          <InfoText infoText={getTextInput("infotext3")} />
                        </td>
                        <td>{parseInteger(item.agencyUsed)}</td>
                        <td>
                          {calculatePercent(
                            item.agencyUsed,
                            item.agencyAllocated
                          )}
                        </td>
                      </tr>
                    ))}
                  />
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 p-0 m-0 order-5">
              <ChartCard
                cardTitle={getTextInput("panel7_heading")}
                cardSubTitle={""}
                cardContent={
                  <HorizontalBarChart
                    data={
                      this.state.isClicked
                        ? CreateArrayBeneficiaryType(this.state.aidCategoryData)
                        : CreateArrayBeneficiaryType(this.state.data)
                    }
                    color="#17a2b8"
                    maintainAspectRatio={true}
                    aspectRatio={1}
                    responsive={true}
                    legend={false}
                    xAxesBeginAtZero={true}
                    //xAxesStepSize={10000}
                    yAxesDisplayTicks={true}
                    xAxesDisplayTicks={true}
                    //yAxesMaxTicksLimit={1000}
                  />
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 p-0 m-0 order-6">
              <ChartCard
                cardTitle={getTextInput("panel8_heading")}
                cardSubTitle={""}
                cardContent={
                  <HorizontalBarChart
                    data={
                      this.state.isClicked
                        ? CreateArrayLocation(this.state.aidCategoryLocation)
                        : CreateArrayLocation(this.state.location)
                    }
                    color="#17a2b8"
                    maintainAspectRatio={true}
                    aspectRatio={1}
                    responsive={true}
                    legend={false}
                    xAxesBeginAtZero={true}
                    //xAxesStepSize={10000}
                    yAxesDisplayTicks={true}
                    xAxesDisplayTicks={true}
                    //yAxesMaxTicksLimit={1000}
                  />
                }
              />
            </div>
            <div className="col-12 p-0 m-0 order-7">
              <ChartCard
                cardTitle="How is aid delivered"
                cardSubTitle={""}
                cardContent={
                  <SankeyChart
                    data={
                      !this.state.isClicked
                        ? createSankeyData(this.state.channels)
                        : createSankeyData(this.state.aidCategoryChannels)
                    }
                  />
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
