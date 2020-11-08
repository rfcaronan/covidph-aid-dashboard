import React, { Component } from "react";
import { UnitCard, ItemCard, ChartCard } from "./subcomponents/cards";
import { getData } from "./dataService";
import { BarChart, DoughnutChart } from "./subcomponents/charts";
import { Chart } from "react-google-charts";
import * as Icon from "react-bootstrap-icons";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getData(),
      });
    }, 5000);
  }

  render() {
    return (
      <React.Fragment>
        {/* Panel 1: one column/two rows */}
        <div className="mx-0 mb-3">
          <div className="row p-0 m-0 align-items-center">
            <div>hello</div>
            <div className="col-5 p-0 m-0 order-1 ">
              <div className="row p-0 m-0 text-center">
                <div className="col p-0 m-0">
                  <p className="p-0 m-0 text-uppercase small">
                    Click an implementing agency
                  </p>
                </div>
              </div>
              <div className="row p-1 m-0">
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/da.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Agriculture"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/deped.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Education"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/dof.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Finance"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/doh.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Health"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/dole.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Labor"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/dswd.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Social Work"
                />
              </div>
            </div>

            <div className="col-5 p-0 m-0 order-3">
              <div className="row p-0 m-0 text-center">
                <div className="col p-0 m-0">
                  <p className="p-0 m-0 text-uppercase small">
                    Click a recipient
                  </p>
                </div>
              </div>
              <div className="row p-0 m-0">
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/businesses.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Businesses"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/families.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Families"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/farmers.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Farmers"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/adults.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Older adults"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/students.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Students"
                />
                <UnitCard
                  logo={
                    <img
                      src={require("../photos/workers.png")}
                      className="unit-img"
                    />
                  }
                  unitName="Workers"
                />
              </div>
            </div>

            <div className="col-2 p-2 m-0 order-2 text-center align-items-center">
              <div className="p-1 m-0 bg-info">
                <h1 className="p-0 m-0 text-white">
                  <span className="small">₱</span>
                  <span className="display-4 font-weight-bolder">41</span>
                  <span className="small">b</span>
                </h1>

                <div className="p-0 pb-2 m-0 bg-info">
                  <p class="p-0 m-0 text-white small">
                    Total amount disbursed
                    <span className="d-block text-white small">
                      (as of June 3, 2020)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2/3: Two columns */}
        <div className="container-fluid mb-2">
          <div className="row p-0">
            <div className="col-sm-12 col-md-6 p-0 m-0">
              <ChartCard
                cardTitle="Types of Assistance and Beneficiaries"
                cardContent={
                  <div>
                    <ItemCard
                      iconAssistance={
                        <Icon.CashStack color="#17a2b8" size={45} />
                      }
                      assistanceType="Cash Assistance"
                      totalAssistanceValue={41}
                      iconBeneficiary={<Icon.Gift />}
                      beneficiaryType="Families"
                      totalBeneficiaryValue={41}
                      proportion={30}
                    />

                    <ItemCard
                      iconAssistance={<Icon.Cart4 color="#17a2b8" size={45} />}
                      assistanceType="Food packs"
                      totalAssistanceValue={41}
                      iconBeneficiary={<Icon.Gift />}
                      beneficiaryType="Families"
                      totalBeneficiaryValue={28}
                      proportion={38}
                    />
                  </div>
                }
              />
            </div>

            <div className="col-sm-12 col-md-6 px-2 pt-2 pb-0 m-0">
              <table className="table table-hover border bg-white rounded shadow-sm">
                <thead>
                  <tr>
                    <th scope="col">Area</th>
                    <th scope="col">Total Received</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data[1].data.map((d) => (
                    <tr key={d.ID}>
                      <td className="text-info">{d.Month}</td>
                      <td>₱ {d.Amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Panel 4/5: Two columns */}
        <div className="container-fluid mb-2">
          <div className="row p-0">
            <div className="col-md-12 col-lg-5 p-0">
              <ChartCard
                cardTitle="Sources of Financing"
                cardContent={
                  <DoughnutChart
                    data={this.state.data[3].data}
                    title={this.state.data[3].title}
                    color={["#FF6384", "#36A2EB", "#FFCE56"]}
                    maintainAspectRatio="false"
                  />
                }
              />
            </div>
            <div className="col-md-12 col-lg-7 p-0">
              <ChartCard
                cardTitle="Delivery Channels"
                cardContent={
                  <Chart
                    chartType="Sankey"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data[2].data}
                    rootProps={{ "data-testid": "2" }}
                  />
                }
              />
            </div>
          </div>
        </div>

        {/* Panel 6: One column */}
        <div className="container-fluid mb-3">
          <div className="row p-0">
            <div className="col p-0">
              <ChartCard
                cardTitle="Disbursement Timeline"
                cardContent={
                  <BarChart
                    data={this.state.data[0].data}
                    title={this.state.data[0].title}
                    color="#17a2b8"
                    maintainAspectRatio={false}
                    responsive={true}
                    legend={false}
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
