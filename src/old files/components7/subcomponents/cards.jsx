import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";
import { greeting } from "./functions";

export function UnitCard(props) {
  return (
    <div className="col p-0 mb-0 justify-content-around">
      <div className="p-0 m-1">
        <img className="unit-img" src={props.src} alt={props.alt} />
      </div>
      <div className="text-center">
        <p className="p-0 m-0 small">{props.unitName}</p>
      </div>
    </div>
  );
}

/*<div className="card-block p-0 m-0 border-info border">
          <span>{props.iconAssistance} </span>
          <span>{props.assistanceType}</span>
          <h2>{props.totalAssistanceValue.toLocaleString()}</h2>
        </div>*/

export function TotalAmountCard(props) {
  return (
    <div>
      <h1 className="display-4 font-weight-bold">
        <span className="small font-weight-bold">{props.currency}</span>
        {props.totalAmount}
        <span className="small font-weight-bold"> B</span>
      </h1>
      <p className="p-0 m-0">{props.amountDescription}</p>
      <p className="">(as of {props.asOfDate})</p>
    </div>
  );
}

export function ItemCard(props) {
  return (
    <div className="p-1 mb-3 ">
      <div className="d-flex p-0 m-1 justify-content-between">
        <span className="lead">
          {props.assistanceType} <Icon.InfoCircleFill />
          <p className="small">(as of June 3, 2020)</p>
        </span>
        <span className="p-0 m-0">{props.iconAssistance}</span>
      </div>
      <div className="p-0 m-0">
        <div className="d-flex p-0 m-0 border-bottom-thick justify-content-between">
          <div className="d-inline-block p-0 m-1">
            <h1 className="">
              <span className="small">₱</span>
              {props.totalAssistanceValue.toLocaleString()}
              <span className="small">b</span>
            </h1>
            <p className="small p-1 m-0">Total amount disbursed</p>
          </div>
          <div className="d-inline-block p-0 m-1">
            <h1 className="">
              {props.totalBeneficiaryValue.toLocaleString()}
              <span className="small">m</span>
            </h1>
            <p className="small p-1 m-0">Low-income families </p>
          </div>
          <div className="d-inline-block p-0 m-1">
            <h1 className="">
              {props.proportion.toLocaleString()}
              <span className="small">%</span>
            </h1>
            <p className="small p-1 m-0">
              Total no. of families <Icon.QuestionCircleFill />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChartCard(props) {
  return (
    <div className="card border-0 h-100 p-2 bg-light">
      <div className="card-body h-100 p-3 bg-white border border-light rounded shadow-sm">
        <div className="card-title p-0 text-orange font-weight-bold small">
          {props.cardTitle}
        </div>
        <div className="card-text"> {props.cardContent}</div>
      </div>
    </div>
  );
}

/*bg-white border border-light rounded shadow-sm*/
