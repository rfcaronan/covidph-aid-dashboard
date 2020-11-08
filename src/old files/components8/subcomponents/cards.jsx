// Import React DOM
import React from "react";

// Import other dependencies
import * as Icon from "react-bootstrap-icons";

// Import functions
import { greeting } from "./functions";

export class CategoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.addActiveClass = this.addActiveClass.bind(this);
  }
  addActiveClass() {
    const currentState = this.state.active;
    this.setState({
      active: !currentState,
    });
  }

  render() {
    return (
      <div className="col-lg col-md-3 col-sm-3 p-1 m-0 text-center">
        <div className="p-0 m-0 border border-light shadow-sm">
          <div
            className={
              this.state.active
                ? "bg-info col p-2 m-0 text-center"
                : "bg-light col p-2 m-0 text-center"
            }
            onClick={this.addActiveClass}
          >
            <img
              className="unit-img w-25 display-none"
              src={this.props.srcCategory}
              alt={this.props.alt}
            />
            <h6 className="p-1 m-0 text-dark text-center">
              {this.props.categoryName}
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
    );
  }
}

/*export function CategoryCard(props) {
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
}*/

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

export const Tables = (props) => {
  return (
    <table className="table table table-borderless table-hover table-responsive-sm">
      <thead className="thead-small">{props.tableHeader}</thead>
      <tbody>{props.tableBody}</tbody>
    </table>
  );
};
