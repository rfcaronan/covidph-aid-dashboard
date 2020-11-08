// Import React DOM
import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Import sub-components
import { CategoryCard } from "./subcomponents/cards/units";
import { ChartCard } from "./subcomponents/cards/panel";
import { Tables } from "./subcomponents/cards/table";
import { getData, getNewData } from "./dataService";

// Import chart components
import { BarChart } from "./subcomponents/charts/barChart";
import { HorizontalBarChart } from "./subcomponents/charts/horizontalBarChart";
import { DoughnutChart } from "./subcomponents/charts/doughnutChart";
import { SankeyChart } from "./subcomponents/charts/sankeyDiagram";

// Import functions
import { greeting, waveHello, convertValue } from "./subcomponents/functions";

// Import other dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
    };

    // Bind this to function updateData
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    this.setState({
      data: getNewData(),
    });
  }

  render() {
    const name = this.state.data[4].data[0].assistanceType;
    console.log(name);

    return (
      <React.Fragment>
        {/* Panels 1, 2 */}
        <div className="container-fluid mb-2">
          <div className="row p-0 text-center align-items-center">
            <div className="col-lg col-md-12 p-0 order-2">
              <ChartCard
                cardTitle="OF WHICH"
                cardContent={
                  <React.Fragment>
                    <h1 className="display-4 text-info font-weight-bold">
                      <span className="small font-weight-bold">₱</span>
                      250.58
                      <span className="small font-weight-bold"></span>
                    </h1>
                    <p className="p-2 m-0">
                      was spent to cushion the blow to people's livelihoods and
                      the economy {""}{" "}
                      {<FontAwesomeIcon icon="info-circle" size={"sm"} />}
                    </p>
                  </React.Fragment>
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 p-2 order-1">
              <div className="row">
                <div className="col">
                  <h6>
                    To fight coronavirus, the national government has secured
                  </h6>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col">
                  <h2 className="">₱355.58 B</h2>
                  <p className="p-0 m-0 small">from 2019 and 2020 budgets</p>
                  <p className="small">
                    (as of August 2, 2020) {""}{" "}
                    {<FontAwesomeIcon icon="info-circle" size={"md"} />}
                  </p>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-12 p-0 m-0">
                  <p>and</p>
                </div>
                <div className="col">
                  <h2 className="">US$8.13 B</h2>
                  <p className="p-0 m-0 small">from loans and grants</p>
                  <p className="small">
                    (as of August 2, 2020) {""}{" "}
                    {<FontAwesomeIcon icon="info-circle" size={"md"} />}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="container-fluid mb-2">
          <div className="row p-0">
            <div className="col p-0">
              <ChartCard
                cardTitle="What areas aid supports"
                cardContent={
                  <div className="row px-2">
                    <CategoryCard
                      srcCategory={require("../photos/families-black.png")}
                      categoryName="Social Welfare"
                      categoryAmount="41.6"
                      //asOfDate="August 14, 2020"
                    />
                    <CategoryCard
                      srcCategory={require("../photos/workers-black.png")}
                      categoryName="Labor Support"
                      categoryAmount="41.6"
                      //asOfDate="June 22, 2020"
                    />
                    <CategoryCard
                      srcCategory={require("../photos/farmers-black.png")}
                      categoryName="Agriculture Support"
                      categoryAmount="41.6"
                      //asOfDate="June 22, 2020"
                    />
                    <CategoryCard
                      srcCategory={require("../photos/businesses-black.png")}
                      categoryName="Business Support"
                      categoryAmount="41.6"
                      //asOfDate="June 22, 2020"
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Panel 4 */}
        <div className="container-fluid mb-2">
          <div className="row p-0">
            <div className="col h-100 p-0">
              <ChartCard
                cardTitle="When is aid delivered"
                cardContent={
                  <BarChart
                    data={this.state.data[0].data}
                    title={this.state.data[0].title}
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
                    yAxesSuggestedMax={13000}
                    yAxesStepSize={5000}
                  />
                }
              />
            </div>
          </div>
        </div>

        {/* Panels 5, 6, 7, 8*/}
        <div className="container-fluid mb-2">
          <div className="row p-0">
            <div className="col-lg-6 col-md-12 p-0 m-0 order-1">
              <ChartCard
                cardTitle="What are the types of aid"
                cardContent={
                  <React.Fragment>
                    <div className="py-2" style={{ fontFamily: "FontAwesome" }}>
                      <DoughnutChart
                        data={this.state.data[3].data}
                        title={this.state.data[3].title}
                        color={[
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#4bc0c0",
                          "#813405",
                        ]}
                        maintainAspectRatio="false"
                        label1="A"
                        label1Icon={"\uD83D\uDCB0"}
                        label2="B"
                        label2Icon={"\uD83D\uDCB3"}
                        label3="C"
                        label3Icon={"\uD83D\uDED2"}
                        label4="D"
                        label4Icon={"\uD83D\uDEEB"}
                        label5="E"
                        label5Icon={"\u2699"}
                      />
                    </div>

                    <div className="p-0">
                      <Tabs defaultActiveKey="cash" className="text-info">
                        <Tab
                          eventKey="cash"
                          title={<FontAwesomeIcon icon="coins" size={"md"} />}
                        >
                          <Tables
                            tableHeader={
                              <tr>
                                <th scope="col">Amount</th>
                                <th scope="col">Beneficiaries</th>
                                <th scope="col" style={{ width: "10%" }}>
                                  % of Total Population
                                </th>
                              </tr>
                            }
                            tableBody={this.state.data[7].data.map((d) => (
                              <tr key={d.ID}>
                                <td>₱{convertValue(d.Amount)}</td>
                                <td>
                                  {d.BeneficiaryValue.toLocaleString()}{" "}
                                  {d.BeneficiaryType}
                                </td>
                                <td>{d.ActualPopulation.toLocaleString()}%</td>
                              </tr>
                            ))}
                          />
                        </Tab>
                        <Tab
                          eventKey="credit"
                          title={
                            <FontAwesomeIcon icon="credit-card" size={"md"} />
                          }
                        >
                          <Tables
                            tableHeader={
                              <tr>
                                <th scope="col">Amount</th>
                                <th scope="col">Beneficiaries</th>
                                <th scope="col" style={{ width: "10%" }}>
                                  % of Total Population
                                </th>
                              </tr>
                            }
                            tableBody={this.state.data[7].data.map((d) => (
                              <tr key={d.ID}>
                                <td>₱{convertValue(d.Amount)}</td>
                                <td>
                                  {d.BeneficiaryValue.toLocaleString()}{" "}
                                  {d.BeneficiaryType}
                                </td>
                                <td>{d.ActualPopulation.toLocaleString()}%</td>
                              </tr>
                            ))}
                          />
                        </Tab>
                        <Tab
                          eventKey="food-packs"
                          title={
                            <FontAwesomeIcon icon="shopping-cart" size={"md"} />
                          }
                        >
                          <Tables
                            tableHeader={
                              <tr>
                                <th scope="col">Amount</th>
                                <th scope="col">Beneficiaries</th>
                                <th scope="col" style={{ width: "10%" }}>
                                  % of Total Population
                                </th>
                              </tr>
                            }
                            tableBody={this.state.data[7].data.map((d) => (
                              <tr key={d.ID}>
                                <td>₱{convertValue(d.Amount)}</td>
                                <td>
                                  {d.BeneficiaryValue.toLocaleString()}{" "}
                                  {d.BeneficiaryType}
                                </td>
                                <td>{d.ActualPopulation.toLocaleString()}%</td>
                              </tr>
                            ))}
                          />
                        </Tab>

                        <Tab
                          eventKey="repatriation"
                          title={
                            <FontAwesomeIcon
                              icon="plane-departure"
                              size={"md"}
                            />
                          }
                        >
                          <Tables
                            tableHeader={
                              <tr>
                                <th scope="col">Amount</th>
                                <th scope="col">Beneficiaries</th>
                                <th scope="col" style={{ width: "10%" }}>
                                  % of Total Population
                                </th>
                              </tr>
                            }
                            tableBody={this.state.data[7].data.map((d) => (
                              <tr key={d.ID}>
                                <td>₱{convertValue(d.Amount)}</td>
                                <td>
                                  {d.BeneficiaryValue.toLocaleString()}{" "}
                                  {d.BeneficiaryType}
                                </td>
                                <td>{d.ActualPopulation.toLocaleString()}%</td>
                              </tr>
                            ))}
                          />
                        </Tab>

                        <Tab
                          eventKey="various"
                          title={<FontAwesomeIcon icon="cog" size={"md"} />}
                          className="tooltip"
                        >
                          <Tables
                            tableHeader={
                              <tr>
                                <th scope="col">Amount</th>
                                <th scope="col">Beneficiaries</th>
                                <th scope="col" style={{ width: "10%" }}>
                                  % of Total Population
                                </th>
                              </tr>
                            }
                            tableBody={this.state.data[7].data.map((d) => (
                              <tr key={d.ID}>
                                <td>₱{convertValue(d.Amount)}</td>
                                <td>
                                  {d.BeneficiaryValue.toLocaleString()}{" "}
                                  {d.BeneficiaryType}
                                </td>
                                <td>{d.ActualPopulation.toLocaleString()}%</td>
                              </tr>
                            ))}
                          />
                        </Tab>
                      </Tabs>
                    </div>
                  </React.Fragment>
                }
              />
            </div>
            <div className="col-lg-6 col-md-12 p-0 m-0 order-3">
              <ChartCard
                cardTitle="Who gets aid"
                cardContent={
                  <HorizontalBarChart
                    data={this.state.data[5].data}
                    title={this.state.data[5].title}
                    color="#17a2b8"
                    maintainAspectRatio={true}
                    aspectRatio={1}
                    responsive={true}
                    legend={false}
                    xAxesStepSize={4000}
                    yAxesDisplayTicks={true}
                    xAxesDisplayTicks={true}
                    yAxesMaxTicksLimit={1000}
                  />
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 p-0 m-0 order-4">
              <ChartCard
                cardTitle="Where aid goes"
                cardContent={
                  <HorizontalBarChart
                    data={this.state.data[5].data}
                    title={this.state.data[5].title}
                    color="#17a2b8"
                    maintainAspectRatio={true}
                    aspectRatio={1}
                    responsive={true}
                    legend={false}
                    xAxesStepSize={4000}
                    yAxesDisplayTicks={true}
                    xAxesDisplayTicks={true}
                    yAxesMaxTicksLimit={1000}
                  />
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 p-0 m-0 order-2">
              <ChartCard
                cardTitle="Who implements aid"
                cardContent={
                  <Tables
                    tableHeader={
                      <tr>
                        <th scope="col">Area</th>
                        <th scope="col">Allocated</th>
                        <th scope="col">Used</th>
                        <th scope="col">Status</th>
                      </tr>
                    }
                    tableBody={this.state.data[1].data.map((d) => (
                      <tr key={d.ID}>
                        <td className="text-info">{d.Month}</td>
                        <td>₱{d.Amount.toLocaleString()}</td>
                        <td>₱{d.Amount.toLocaleString()}</td>
                        <td>{d.Amount.toLocaleString()}%</td>
                      </tr>
                    ))}
                  />
                }
              />
            </div>
          </div>
        </div>

        {/* Panel 8 */}
        <div className="container-fluid mb-3">
          <div className="row p-0">
            <div className="col p-0 m-0">
              <ChartCard
                cardTitle="How is aid delivered"
                cardContent={
                  <SankeyChart sankeyOptions={this.state.data[2].data} />
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
