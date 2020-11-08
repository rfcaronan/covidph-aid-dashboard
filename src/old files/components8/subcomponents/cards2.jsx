import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";
import { greeting } from "./functions";

export function CategoryCard(props) {
  return (
    <div className="col-lg col-md-3 col-sm-4 p-0 m-1 justify-content-around">
      <div className="col p-1 m-0 text-center ">
        <div className="row p-1 m-0 bg-white border border-light shadow-sm">
          <div className="col p-2 m-0 text-center">
            <img
              className="unit-img w-75 display-none"
              src={props.srcCategory}
              alt={props.alt}
            />
            <h6 className="p-1 m-1 text-dark text-center category-name">
              {props.categoryName}
            </h6>
          </div>
        </div>
        <div className="col p-1 m-0 text-center bg-white border border-light shadow-sm border-top-0">
          <h1 className="p-2 m-0 text-info">
            <span className="small">₱</span>
            <span className="">41</span>
            <span className="small"> B</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export function ChartCard(props) {
  return (
    <div className="card border-0 w-100 h-100 p-2 bg-light">
      <div className="card-body p-3 align-items-center h-100 bg-white border border-light rounded shadow-sm">
        <div className="">
          <h6 className="card-title text-orange font-weight-bold">
            {props.cardTitle} {}{" "}
            {/*<span className="text-dark">
            <Icon.QuestionCircleFill />
  </span>*/}
          </h6>
        </div>
        <div className="card-text align-items-center ">
          {" "}
          {props.cardContent}
        </div>
      </div>
    </div>
  );
}

export function Tables(props) {
  return (
    <table className="table table table-borderless table-hover">
      <thead className="thead-small">{props.tableHeading}</thead>
      <tbody>{props.tableBody}</tbody>
    </table>
  );
}
