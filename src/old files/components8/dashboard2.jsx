// Import React DOM
import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Import sub-components
import { CategoryCard, ChartCard, Tables } from "./subcomponents/cards2";
import { getData, getNewData } from "./dataService";
import {
  BarChart,
  HorizontalBarChart,
  DoughnutChart,
} from "./subcomponents/charts2";

// Import functions
import { greeting, waveHello, convertValue } from "./subcomponents/functions";

// Import chart dependencies
import * as Icon from "react-bootstrap-icons";

// Import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highchartsSankey from "highcharts/modules/sankey";
highchartsSankey(Highcharts);

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
        <div className="mb-1">
          <div className="row p-0 m-0 text-center align-items-center">
            <div className="col-lg-5 col-md-12">
              <h1 className="display-4 font-weight-bold">
                <span className="small font-weight-bold">₱</span>
                250.58
                <span className="small font-weight-bold"> B</span>
              </h1>
              <p className="p-0 m-0">
                Amount Allocated for Cushioning the Blow to People's Livelihoods
                and the Economy
              </p>
            </div>
            <div className="col-lg col-md-12 p-0">
              <ChartCard
                cardTitle="Where the money is sourced"
                cardContent={
                  <div className="row">
                    <div className="col-6">
                      <h2 className="text-info">₱353.58 B</h2>
                      <p className="p-0 m-0 small">From 2019 and 2020 Budget</p>
                      <p className="small">(as of August 2, 2020)</p>
                    </div>
                    <div className="col-6">
                      <h2 className="text-info">US$8.13 B</h2>
                      <p className="p-0 m-0 small">From Loans and Grants</p>
                      <p className="small">(as of August 2, 2020)</p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="mb-2">
          <div
            className="row p-0 m-0 align-items-center text-center"
            onClick={this.updateData}
          >
            <CategoryCard
              srcCategory={require("../photos/families.png")}
              categoryName="Social Welfare"
              categoryAmount="41.6"
              //asOfDate="August 14, 2020"
            />
            <CategoryCard
              srcCategory={require("../photos/workers.png")}
              categoryName="Labor Support"
              categoryAmount="41.6"
              //asOfDate="June 22, 2020"
            />
            <CategoryCard
              srcCategory={require("../photos/farmers.png")}
              categoryName="Agriculture Support"
              categoryAmount="41.6"
              //asOfDate="June 22, 2020"
            />
            <CategoryCard
              srcCategory={require("../photos/businesses.png")}
              categoryName="Business Support"
              categoryAmount="41.6"
              //asOfDate="June 22, 2020"
            />
            <CategoryCard
              srcCategory={require("../photos/students.png")}
              categoryName="LGU Funding"
              categoryAmount="41.6"
              //asOfDate="June 22, 2020"
            />
          </div>
        </div>

        {/* Panels 4, 5, 6, 7 */}
        <div className="container-fluid mb-2">
          <div className="row p-0">
            <div className="col-lg-6 col-md-12 p-0 m-0">
              <ChartCard
                cardTitle="What are the types of aid"
                cardContent={
                  <React.Fragment>
                    <div className="py-2">
                      <DoughnutChart
                        data={this.state.data[3].data}
                        title={this.state.data[3].title}
                        color={[
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#2FBF71",
                          "#813405",
                        ]}
                        maintainAspectRatio="false"
                      />
                    </div>

                    <div className="p-0">
                      <Tabs defaultActiveKey="cash" className="text-info">
                        <Tab
                          eventKey="cash"
                          title={<Icon.CashStack color="#17a2b8" size={20} />}
                        >
                          <Tables
                            tableHeading={
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
                            <Icon.CreditCardFill color="#17a2b8" size={20} />
                          }
                        >
                          <Tables
                            tableHeading={
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
                          title={<Icon.Cart4 color="#17a2b8" size={20} />}
                        >
                          <Tables
                            tableHeading={
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
                          title={<Icon.Truck color="#17a2b8" size={20} />}
                        >
                          <Tables
                            tableHeading={
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
                          title={
                            <Icon.GearWideConnected color="#17a2b8" size={20} />
                          }
                        >
                          <Tables
                            tableHeading={
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
            <div className="col-lg-6 col-md-12 p-0 m-0">
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
                    gridLines={false}
                  />
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 p-0 m-0">
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
                    gridLines={false}
                  />
                }
              />
            </div>

            <div className="col-lg-6 col-md-12 p-0 m-0">
              <ChartCard
                cardTitle="Who implements aid"
                cardContent={
                  <Tables
                    tableHeading={
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
        <div className="container-fluid mb-2">
          <div className="row p-0">
            <div className="col p-0">
              <ChartCard
                cardTitle="How is aid delivered"
                cardContent={
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.data[2].data}
                    // constructorType="sankyChart"
                  />
                }
              />
            </div>
          </div>
        </div>

        {/* Panel 9: */}
        <div className="container-fluid mb-3">
          <div className="row p-0">
            <div className="col p-0">
              <ChartCard
                cardTitle="When is aid delivered"
                cardContent={
                  <BarChart
                    data={this.state.data[0].data}
                    title={this.state.data[0].title}
                    color="#17a2b8"
                    maintainAspectRatio={false}
                    responsive={true}
                    legend={false}
                    gridLines={false}
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
