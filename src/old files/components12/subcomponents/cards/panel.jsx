// Import React DOM
import React, { Component } from "react";

// Import dependencies
//import * as Icon from "react-bootstrap-icons";
import { sentenceCase } from "../functions";

export const ChartCard = (props) => {
  return (
    <div className="card border-0 p-2 h-100 bg-light">
      <div className="card-body p-3 align-items-center bg-white border border-light rounded shadow-sm">
        <div className="">
          <h6 className="card-title text-purple font-weight-bold">
            {sentenceCase(props.cardTitle)}
          </h6>
          <p className="small text-uppercase">{props.cardSubTitle}</p>
        </div>
        <div className="card-text p-0 m-0 align-items-center">
          {" "}
          {props.cardContent}
        </div>
        <div className="pt-2">
          <p className="p-0 m-0 small font-italic">{props.notes}</p>
          <p className="p-0 m-0 small font-italic">{props.sources}</p>
        </div>
      </div>
    </div>
  );
};
