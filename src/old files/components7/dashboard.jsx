// Import React DOM
import React, { Component } from "react";

// Import sub-components
import { UnitCard, ItemCard, ChartCard } from "./subcomponents/cards";
import { getData, getNewData } from "./dataService";
import { BarChart, DoughnutChart } from "./subcomponents/charts";

// Import functions
import { greeting, waveHello } from "./subcomponents/functions";
import { UnitCard2 } from "./subcomponents/units";

// Import chart dependencies
import * as Icon from "react-bootstrap-icons";

//import Highcharts from "highcharts";
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

  /*handleOnError = (err, file, inputElem, reason) => {
    console.log(err);

  /*componentDidUpdate() {
    this.state.data.labels = this.props.data.map((d) => d.label);
    this.state.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.state.update();
  }*/

  /*componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getData(),
      });
    }, 5000);
  }*/

  updateData() {
    this.setState({
      data: getNewData(),
    });
    //this.setState({ data: newData }); // or shorter ES syntax: this.setState({ data });
    //console.log(data);
  }

  /*handleButtonClick = (e) => {
    const { value } = e.target;
    const isAnnual = value === "annual";

    const newData = isAnnual ? managerData : managerQuarterData;
    const newLabels = isAnnual ? yearLabels : quarterLabels;
    const newAverage = isAnnual
      ? nationalAverageData
      : nationalAverageQuarterData;

    this.setState({
      data: newData,
      average: newAverage,
      labels: newLabels,
    });
  };

  handleClick = (e) => {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({ posts: data }); // or shorter ES syntax: this.setState({ data });
    //console.log(data);
  };*/

  render() {
    const name = this.state.data[4].data[0].assistanceType;
    console.log(name);
    return (
      <React.Fragment>
        {/* Panel 1: one column/two rows */}
        <div className="mx-0 mb-3">
          <div className="row p-0 m-0 align-items-center">
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
                  src={require("../photos/da.png")}
                  alt="Department of Agriculture"
                  unitName="Agriculture"
                />
                <UnitCard
                  src={require("../photos/deped.png")}
                  alt="Department of Education"
                  unitName="Education"
                />
                <UnitCard
                  src={require("../photos/dof.png")}
                  alt="Department of Finance"
                  unitName="Finance"
                />
                <UnitCard
                  src={require("../photos/doh.png")}
                  alt="Department of Health"
                  unitName="Health"
                />
                <UnitCard
                  src={require("../photos/dole.png")}
                  alt="Department of Labor and Employment"
                  unitName="Labor"
                />
                <UnitCard
                  src={require("../photos/dswd.png")}
                  alt="Department of Social Work and Development"
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
              <div className="row p-0 m-0" onClick={this.updateData}>
                <UnitCard
                  src={require("../photos/businesses.png")}
                  unitName="Businesses"
                />
                <UnitCard
                  src={require("../photos/families.png")}
                  unitName="Families"
                />
                <UnitCard
                  src={require("../photos/farmers.png")}
                  unitName="Farmers"
                />
                <UnitCard
                  src={require("../photos/adults.png")}
                  unitName="Older adults"
                />
                <UnitCard
                  src={require("../photos/students.png")}
                  unitName="Students"
                />
                <UnitCard
                  src={require("../photos/workers.png")}
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
                      assistanceType={this.state.data[4].data[0].assistanceType}
                      totalAssistanceValue={this.state.data[4].data[0].amount}
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
