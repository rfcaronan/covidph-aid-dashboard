import React, { Component } from "react";
import { getData } from "./dataService";
import { BarChart } from "./charts";
import { Chart } from "react-google-charts";

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
      <div className="container">
        <div className="row mb-3 p-0">
          <div className="col-12 p-0">
            <h6 className="p-0 mb-0 text-muted text-uppercase small font-weight-bold">
              Disbursement Timeline
            </h6>
            <div className="col">
              <BarChart
                data={this.state.data[0].data}
                title={this.state.data[0].title}
                color="#B08EA2"
                maintainAspectRatio={false}
                responsive={true}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3 p-0">
          <div className="col-4">
            <div className="row">
              <div className="col-12 p-0 mx-0">
                <h6 className="p-0 mb-0 text-muted text-uppercase small font-weight-bold">
                  Assistance Type
                </h6>
              </div>
              <div className="col-12 p-0 mx-0 bg-white">
                <span className="card-title ">Cash Assistance</span>
              </div>
              <div className="col-4 p-0 mx-0 bg-white">
                <div className="card">
                  <div className="card-body p-1">
                    <h3 className="card-title">₱23</h3>
                    <h6 className="card-subtitle mb-2 text-muted">billion</h6>
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mx-0">
                <div className="card">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">18.28</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      poor families
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mx-0 bg-white">
                <div className="card border-0">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">41%</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row border border-info">
              <div className="col-12 p-0 mx-0">
                <span className="card-title ">Food Packs</span>
              </div>
              <div className="col-4 p-0 mx-0">
                <div className="card border border-danger">
                  <div className="card-body p-1">
                    <h3 className="card-title">₱23</h3>
                    <h6 className="card-subtitle mb-2 text-muted">billion</h6>
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mx-0">
                <div className="card">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">18.28</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      poor families
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mx-0 border border-primary">
                <div className="card">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">41%</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row border border-info">
              <div className="col-12 p-0 mx-0">
                <span className="card-title ">Non-food Items</span>
              </div>
              <div className="col-4 p-0 mx-0">
                <div className="card">
                  <div className="card-body p-1">
                    <h3 className="card-title">₱23</h3>
                    <h6 className="card-subtitle mb-2 text-muted">billion</h6>
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mx-0">
                <div className="card">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">18.28</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      poor families
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mx-0">
                <div className="card border-0">
                  <div className="card-body p-1 mx-0 my-0">
                    <h3 className="card-title">41%</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 p-0">
            <h6 className="p-0 mb-0 text-muted text-uppercase small font-weight-bold">
              Location
            </h6>
            <div className="col">
              <table className="table table-sm">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Area</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data[1].data.map((d) => (
                    <tr key={d.ID}>
                      <td>{d.Month}</td>
                      <td>{d.Amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-5 p-0">
            <h6 className="p-0 mb-0 text-muted text-uppercase small font-weight-bold">
              Delivery Channels
            </h6>
            <div className="col">
              <Chart
                //width={600}
                height={"355px"}
                chartType="Sankey"
                loader={<div>Loading Chart</div>}
                data={this.state.data[2].data}
                rootProps={{ "data-testid": "2" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
