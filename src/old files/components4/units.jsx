import React, { Component } from "react";

export const Units = () => {
  return (
    <React.Fragment>
      <div className="container-fluid px-lg-5">
        <div className="row text-center">
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
    </React.Fragment>
  );
};
