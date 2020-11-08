import React, { Component } from "react";

class Units extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid px-lg-5">
          <div className="row text-center border border-dark">
            <div className="col">
              <p className="my-0 small">CLICK A BENECIFICIARY TO ANALYZE</p>
            </div>
          </div>
          <div className="row mb-3 text-center justify-content-around border border-dark">
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
                  OFWs
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
                  Drivers
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
                  Businesses
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
                  Students
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
                  Seniors
                </a>
              </div>
            </div>

            <div className="col-sm-2 col-md-2 col-lg-1 mb-0">
              <div className="card-body p-0">
                <a href="#">
                  <img
                    src={require("../photos/worker.png")}
                    className="img-fluid p-0 mx-0 shadow-sm rounded-circle"
                    alt=""
                  />
                </a>
                <a href="#" className="card-text my-0">
                  Others
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Units;
