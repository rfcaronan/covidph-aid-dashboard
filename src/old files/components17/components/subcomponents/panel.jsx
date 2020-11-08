import React from "react";
import { sentenceCase } from "./functions";

export const ChartCard = (props) => {
  return (
    <div key={props.index} className="card border-0 p-1 h-100 bg-light">
      <div className="card-body p-3 m-1 bg-white border border-light rounded shadow-sm">
        <div className="d-flex align-items-start">
          <div>
            <p className="font-weight-title">{sentenceCase(props.cardTitle)}</p>
          </div>
          <div className="ml-auto p-2 align-top mt-0">{props.actionButton}</div>
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
