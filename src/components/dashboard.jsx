// Import react
import React, { Component } from "react";
import { readRemoteFile } from "react-papaparse";

import { CategoryCard } from "./subcomponents/units";
import { ChartCard } from "./subcomponents/panel";
import {
  Beneficiaries,
  InternalSource,
  TopFinanciers,
} from "./subcomponents/table";
import { InfoText } from "./subcomponents/infoText";
import { BasicButton, ResetButton } from "./subcomponents/buttons";

import Timeline from "./subcomponents/timeline";
import HorizontalBarChart from "./subcomponents/horizontalBarChart";
import StackedBarChart from "./subcomponents/stackedBarChart";
import DoughnutChart from "./subcomponents/doughnutChart";

import {
  colors,
  convertToString,
  convertValue,
  CreateArrayAgencyType,
  CreateArrayAidCategory,
  CreateArrayAidType,
  CreateArrayBeneficiaryType,
  CreateArrayDateExpenditure,
  CreateArrayLocation,
  CreateArrayExternalSource,
  getNewDataBeneficiary,
  getNewDataAgency,
  getNewDataAidCategory,
  getNewDataAidType,
  getNewDataLocation,
  lowerCase,
  oneDecimalPlace,
  sentenceCase,
} from "./subcomponents/functions";

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      textData: [],
      data: [],
      aidCategoryData: [],
      financeSources: [],
      isClicked: false,
      isHover: false,
    };

    this.updateTextData = this.updateTextData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateFinancingSources = this.updateFinancingSources.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
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

    readRemoteFile(require("../datasets/financingSourcesData.csv"), {
      header: true,
      download: true,
      skipEmptyLines: true,
      onError: this.handleOnError,
      complete: this.updateFinancingSources,
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

  updateFinancingSources(result) {
    const data = result.data;
    this.setState({ financeSources: data });
  }

  resetClick = () => {
    this.setState({ isClicked: false });
  };

  handleOnClick = (index, filterItem) => {
    this.setState({
      isClicked: index,
      aidCategoryData: getNewDataAidCategory(this.state.data, filterItem),
    });
    if (this.state.isClicked === index) {
      this.setState({ isClicked: !this.state.isClicked });
    }
  };

  handleChartClick = (e, myChart) => {
    e.preventDefault();
    if (myChart[0] !== undefined) {
      let firstPoint = myChart[0]._index;
      let datasets = myChart[0]._chart.config.data;
      let title = convertToString(datasets.datasets[0].title);
      let label = datasets.labels[firstPoint];

      console.log(label);

      this.setState({
        isClicked: true,
        aidCategoryData:
          title === "agency"
            ? getNewDataAgency(this.state.data, label)
            : title === "aidType"
            ? getNewDataAidType(this.state.data, label)
            : title === "agency"
            ? getNewDataAgency(this.state.data, label)
            : title === "location"
            ? getNewDataLocation(this.state.data, label)
            : title === "beneficiaryType"
            ? getNewDataBeneficiary(this.state.data, label)
            : null,
      });
    } else {
      return null;
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
    // Get text input from the data
    const getTextInput = (inputCode) => {
      return this.state.textData
        .filter(({ textType }) => textType === convertToString(inputCode))
        .map((d) => [d.index, d.text]);
    };

    const totalAid = this.state.data.reduce(
      (total, item) => total + parseFloat(item.value),
      0
    );

    const totalExternalSource = this.state.financeSources
      .filter(({ funding }) => funding === "external")
      .reduce((total, item) => total + parseFloat(item.convertedValue), 0);

    const totalInternalSource = this.state.financeSources
      .filter(({ funding }) => funding === "internal")
      .reduce((total, item) => total + parseFloat(item.value), 0);

    return (
      <React.Fragment>
        <div className="container-fluid mb-2">
          <div className="row p-0 m-0">
            <div className="col-lg-6 col-md-12 p-0 m-0 order-1">
              <div className="row p-0 m-0 align-items-center">
                <div className="col-lg-6 col-md-6 m-0 p-0 order-1">
                  <div className="row m-0 p-0">
                    <div className="col-12 m-0">
                      {getTextInput("panel1_text1").map((d) => (
                        <p key={d[0]} className="">
                          {d[1]}
                        </p>
                      ))}
                    </div>
                    <div className="col-lg m-0 p-0 order-1">
                      <div className="row align-items-center m-0 p-0">
                        <div className="col m-0">
                          <h4 className="">
                            <span className="small">₱</span>
                            {convertValue(totalInternalSource)}
                          </h4>
                          <p>
                            {getTextInput("panel1_source1").map((d) => (
                              <span key={d[0]} className="p-0 m-0 small">
                                {d[1]}{" "}
                              </span>
                            ))}
                            <InfoText
                              className="larger-width-tooltip"
                              infoText={
                                <React.Fragment>
                                  {getTextInput("panel1_source1_heading").map(
                                    (d) => (
                                      <p
                                        key={d[0]}
                                        className="font-weight-title"
                                      >
                                        {d[1]}
                                      </p>
                                    )
                                  )}
                                  <InternalSource
                                    data={this.state.financeSources}
                                  />
                                  {getTextInput("panel1_source1_note").map(
                                    (d) => (
                                      <p
                                        key={d[0]}
                                        className="d-inline p-0 m-0 small font-italic"
                                      >
                                        {d[1]}{" "}
                                      </p>
                                    )
                                  )}
                                  {getTextInput("panel1_source1_source").map(
                                    (d) => (
                                      <p
                                        key={d[0]}
                                        className="d-inline p-0 m-0 small font-italic"
                                      >
                                        {d[1]}
                                      </p>
                                    )
                                  )}
                                </React.Fragment>
                              }
                            />
                          </p>
                        </div>
                        <div className="col-1 p-0 m-0">
                          <div className="row text-center">
                            <p>and</p>
                          </div>
                        </div>
                        <div className="col m-0">
                          <h4 className="">
                            <span className="small">₱</span>
                            {convertValue(totalExternalSource)}
                          </h4>
                          <p>
                            {getTextInput("panel1_source2").map((d) => (
                              <span key={d[0]} className="p-0 m-0 small">
                                {d[1]}{" "}
                              </span>
                            ))}
                            <InfoText
                              className="larger-width-tooltip"
                              infoText={
                                <React.Fragment>
                                  {getTextInput("panel1_source2_heading").map(
                                    (d) => (
                                      <p
                                        key={d[0]}
                                        className="font-weight-title"
                                      >
                                        {d[1]}
                                      </p>
                                    )
                                  )}
                                  <DoughnutChart
                                    data={CreateArrayExternalSource(
                                      this.state.financeSources
                                    )}
                                    backgroundColor={colors}
                                  />
                                  {getTextInput("panel1_source2_heading2").map(
                                    (d) => (
                                      <p
                                        key={d[0]}
                                        className="font-weight-title"
                                      >
                                        {d[1]}
                                      </p>
                                    )
                                  )}
                                  <TopFinanciers
                                    data={this.state.financeSources}
                                  />
                                  {getTextInput("panel1_source2_note").map(
                                    (d) => (
                                      <p
                                        key={d[0]}
                                        className="d-inline p-0 m-0 small font-italic"
                                      >
                                        {d[1]}{" "}
                                      </p>
                                    )
                                  )}
                                  {getTextInput("panel1_source2_source").map(
                                    (d) => (
                                      <p
                                        key={d[0]}
                                        className="d-inline p-0 m-0 small font-italic"
                                      >
                                        {d[1]}
                                      </p>
                                    )
                                  )}
                                </React.Fragment>
                              }
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg col-md-6 p-0 pl-0 m-0 order-2">
                  <ChartCard
                    index={getTextInput("panel2_text1").map((d) => d[0])}
                    cardTitle={getTextInput("panel2_text1").map((d) => d[1])}
                    cardContent={
                      <React.Fragment>
                        <h1 className="text-pelorous font-weight-bold m-0 p-0">
                          <span className="small">₱</span>
                          {convertValue(totalAid)}
                        </h1>
                        <p>
                          {getTextInput("panel2_text2").map((d) => (
                            <span key={d[0]} className="p-0 m-0">
                              {d[1]}{" "}
                            </span>
                          ))}
                        </p>
                      </React.Fragment>
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 p-0 m-0 order-2">
              <ChartCard
                index={getTextInput("panel3_heading").map((d) => d[0])}
                cardTitle={getTextInput("panel3_heading").map((d) => d[1])}
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
                    <ResetButton
                      onClick={this.resetClick}
                      className={!this.state.isClicked ? "d-none" : ""}
                    />
                  </div>
                }
              />
            </div>

            <div className="col-lg-12 col-md-12 p-0 m-0 order-3">
              <ChartCard
                index={getTextInput("panel4_heading").map((d) => d[0])}
                cardTitle={getTextInput("panel4_heading").map((d) => d[1])}
                notes={getTextInput("panel4_notes").map((d) => d[1])}
                //sources={getTextInput("panel4_sources").map((d) => d[1])}
                actionButton={
                  <div class="d-flex flex-row-reverse">
                    <BasicButton buttonLabel="Week" className="active" />
                  </div>
                }
                cardContent={
                  <Timeline
                    height={180}
                    title={"date"}
                    data={
                      !this.state.isClicked
                        ? CreateArrayDateExpenditure(this.state.data)
                        : CreateArrayDateExpenditure(this.state.aidCategoryData)
                    }
                    annotationText1="March 16–April 30"
                    annotationXAdjustText1={-50}
                    annotationYAdjustText1={-5}
                    annotationText2="Luzon was under ECQ"
                    annotationXAdjustText2={-60}
                    annotationYAdjustText2={11}
                    annotationText3="May 31"
                    annotationXAdjustText3={-300}
                    annotationYAdjustText3={-5}
                    annotationText4="ECQ ended. MECQ or GCQ took effect"
                    annotationXAdjustText4={-430}
                    annotationYAdjustText4={-5}
                  />
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 p-0 m-0 order-4">
              <ChartCard
                index={getTextInput("panel5_heading").map((d) => d[0])}
                cardTitle={getTextInput("panel5_heading").map((d) => d[1])}
                notes={getTextInput("panel5_notes").map((d) => d[1])}
                //sources={getTextInput("panel5_sources").map((d) => d[1])}
                cardContent={
                  <React.Fragment>
                    <div className="p-0">
                      <StackedBarChart
                        title={"agency"}
                        firstLabel={"Used"}
                        secondLabel={"Allotment"}
                        data={
                          !this.state.isClicked
                            ? CreateArrayAgencyType(this.state.data)
                            : CreateArrayAgencyType(this.state.aidCategoryData)
                        }
                        aspectRatio={2}
                        handleChartClick={this.handleChartClick}
                      />
                    </div>
                    <ResetButton
                      onClick={this.resetClick}
                      className={!this.state.isClicked ? "d-none" : ""}
                    />
                  </React.Fragment>
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 p-0 m-0 order-5">
              <ChartCard
                index={getTextInput("panel6_heading").map((d) => d[0])}
                cardTitle={getTextInput("panel6_heading").map((d) => d[1])}
                notes={getTextInput("panel6_notes").map((d) => d[1])}
                //sources={getTextInput("panel6_sources").map((d) => d[1])}
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
                      className={!this.state.isClicked ? "d-none" : ""}
                    />
                  </React.Fragment>
                }
              />
            </div>

            <div className="col-lg-8 col-md-12 d-none d-xl-block d-lg-block d-md-block p-0 m-0 order-6">
              <ChartCard
                index={getTextInput("panel8_heading").map((d) => d[0])}
                cardTitle={getTextInput("panel8_heading").map((d) => d[1])}
                notes={getTextInput("panel8_notes").map((d) => d[1])}
                //sources={getTextInput("panel8_sources").map((d) => d[1])}
                cardContent={
                  <React.Fragment>
                    <div className="p-0 m-0">
                      <Beneficiaries
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
                      className={!this.state.isClicked ? "d-none" : ""}
                    />
                  </React.Fragment>
                }
              />
            </div>

            <div className="col-lg-8 col-md-12 d-block d-sm-block d-md-none d-lg-none d-xl-none p-0 m-0 order-6">
              <ChartCard
                index={getTextInput("panel8_heading").map((d) => d[0])}
                cardTitle={getTextInput("panel8_heading").map((d) => d[1])}
                notes={getTextInput("panel8_notes").map((d) => d[1])}
                //sources={getTextInput("panel8_sources").map((d) => d[1])}
                cardContent={
                  <React.Fragment>
                    <div className="p-0 m-0">
                      <HorizontalBarChart
                        title={"beneficiaryType"}
                        data={
                          !this.state.isClicked
                            ? CreateArrayBeneficiaryType(this.state.data)
                            : CreateArrayBeneficiaryType(
                                this.state.aidCategoryData
                              )
                        }
                        aspectRatio={!this.state.isClicked ? 1 : 2}
                        handleChartClick={this.handleChartClick}
                      />
                    </div>
                    <ResetButton
                      onClick={this.resetClick}
                      className={!this.state.isClicked ? "d-none" : ""}
                    />
                  </React.Fragment>
                }
              />
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 p-0 m-0 order-7">
              <ChartCard
                index={getTextInput("panel9_heading").map((d) => d[0])}
                cardTitle={getTextInput("panel9_heading").map((d) => d[1])}
                notes={getTextInput("panel9_notes").map((d) => d[1])}
                //sources={getTextInput("panel9_sources").map((d) => d[1])}
                cardContent={
                  <React.Fragment>
                    <div className="p-0">
                      <HorizontalBarChart
                        title={"location"}
                        data={
                          !this.state.isClicked
                            ? CreateArrayLocation(this.state.data)
                            : CreateArrayLocation(this.state.aidCategoryData)
                        }
                        aspectRatio={!this.state.isClicked ? 1 : 2}
                        handleChartClick={this.handleChartClick}
                      />
                    </div>
                    <ResetButton
                      onClick={this.resetClick}
                      className={!this.state.isClicked ? "d-none" : ""}
                    />
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
