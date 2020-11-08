import React, { Component } from "react";
import { DoughnutChart } from "../components/charts";
import { getData } from "../components/dataService";

class Units extends Component {
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
        <div className="container border border-warning">
          <div className="row">
            <div className="col-6 border border-dark">
              <div className="row text-center border border-dark">
                <div className="col">
                  <p className="my-0 small">CLICK A BENECIFICIARY TO ANALYZE</p>
                </div>
              </div>
              <div className="row mb-3 text-center justify-content-around">
                <div className="col-sm-2 col-md-2 col-lg-1 mb-0">
                  <div className="card-body p-0 mx-0">
                    <a href="#">
                      <img
                        src={require("../photos/worker.png")}
                        className="img-fluid p-0 mx-0 shadow-sm rounded-circle"
                        alt=""
                      />
                    </a>
                    <a href="#" className="card-text my-0">
                      Families
                    </a>
                  </div>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-1 mb-0">
                  <div className="card-body p-0 ">
                    <a href="#">
                      <img
                        src={require("../photos/worker.png")}
                        className="img-fluid p-0 mx-0 shadow-sm rounded-circle"
                        alt=""
                      />
                    </a>
                    <a href="#" className="card-text my-0">
                      Workers
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 border border-dark">
              <div>
                <DoughnutChart
                  data={this.state.data[3].data}
                  title={this.state.data[3].title}
                  color={["#FF6384", "#36A2EB", "#FFCE56"]}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Units;
