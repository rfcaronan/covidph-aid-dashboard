import React, { Component } from "react";

export function UnitCard2(props) {
  return (
    <React.Fragment>
      <div className="col-sm-12 col-md-2 col-lg-2 p-0 mb-0 justify-content-around">
        <div className="p-0 m-1">
          <img className="unit-img" src={props.src} />
        </div>
        <div className="text-center">
          <p className="p-0 m-0 small">{props.unitName}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
