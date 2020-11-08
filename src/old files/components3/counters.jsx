import React, { Component } from "react";

class Counters extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid px-lg-5">
        <div className="row justify-content-between">
          <div className="col-sm-6 col-md-3 mb-4">
            <div className="card shadow-sm ">
              <div className="card-body">
                <div className="row no-gutters">
                  <div className="col mr-2">
                    <div className="h2 font-weight-bold text-dark text-uppercase mb-1">
                      ₱40,000
                    </div>
                    <div className="text-xs mb-0 text-gray-800">
                      Amount committed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 mb-4">
            <div className="card border-left-primary shadow-sm">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h2 font-weight-bold text-dark text-uppercase mb-1">
                      ₱40,000
                    </div>
                    <div className="text-xs mb-0 text-gray-800">
                      Amount committed
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 mb-4">
            <div className="card border-left-primary shadow-sm">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h2 font-weight-bold text-dark text-uppercase mb-1">
                      ₱40,000
                    </div>
                    <div className="text-xs mb-0 text-gray-800">
                      Amount committed
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 mb-4">
            <div className="card border-left-primary shadow-sm">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h2 font-weight-bold text-dark text-uppercase mb-1">
                      ₱40,000
                    </div>
                    <div className="text-xs mb-0 text-gray-800">
                      Amount committed
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Counters;
