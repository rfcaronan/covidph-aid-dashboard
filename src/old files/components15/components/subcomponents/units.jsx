import React from "react";
import { convertValue, titleCase } from "./functions";

export class CategoryCard extends React.Component {
  render() {
    let convertedValue = convertValue(
      this.props.categoryAmount
    ).toLocaleString();
    let convertedValueArray = convertedValue.split(" ");

    return (
      <div className="col-lg col-md-6 col-sm-6 p-1 m-0 text-center">
        <div
          className={this.props.className + " row p-0 m-0 shadow-sm pointer"}
          onClick={this.props.onClickEvent}
          onMouseEnter={this.props.onHoverEvent}
          onMouseLeave={this.props.onHoverEvent}
        >
          <div className="col bg-light p-1">
            <div className="col-12 p-0">
              {/*<img
                className="unit-img w-25 display-none"
                src={this.props.srcCategory}
                alt={this.props.alt}
              />*/}
              <p className="small p-1 m-0 text-dark text-center">
                {titleCase(this.props.categoryName)}
              </p>
            </div>
          </div>

          <div className="col-12">
            <h4 className="p-2 m-0 text-pelorous font-weight-bold">
              <span className="small">₱</span>
              <span className="">{convertedValueArray.slice(0, 1)}</span>
              {/*<span className="small">{convertedValueArray.slice(1)}</span>*/}
            </h4>
            <p className="small text-pelorous">{this.props.additionalNotes}</p>
          </div>
        </div>
      </div>
    );
  }
}
