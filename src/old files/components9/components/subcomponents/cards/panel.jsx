// Import React DOM
import React from "react";

// Import dependencies
import * as Icon from "react-bootstrap-icons";

export const ChartCard = (props) => {
  return (
    <div className="card border-0 p-2 h-100 bg-light">
      <div className="card-body p-3 align-items-center bg-white border border-light rounded shadow-sm">
        <div className="">
          <h6 className="card-title text-orange font-weight-bold">
            {props.cardTitle} {}{" "}
            {/*<span className="text-dark">
            <Icon.QuestionCircleFill />
  </span>*/}
          </h6>
        </div>
        <div className="card-text p-0 m-0 h-100 align-items-center">
          {" "}
          {props.cardContent}
        </div>
      </div>
    </div>
  );
};
