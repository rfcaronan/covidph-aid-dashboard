//Import React DOM
import React, { Component } from "react";

// Import functions
import { convertValue, titleCase, getNewData } from "../functions";

export class CategoryCard extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    //this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnHover = this.handleOnHover.bind(this);
  }*/

  /*handleOnClick(e) {
    e.preventDefault();
    updateNewData(newData);
    this.setState({ active: !this.state.active });
  }*/

  /*handleOnHover(e) {
    e.preventDefault();
    this.setState({ hover: !this.state.hover });
  }*/

  render() {
    /*let activeClass;
    if (this.state.hover) {
      activeClass = "row p-0 m-0 border border-info border-4 shadow-sm pointer";
    } else {
      activeClass = "row p-0 m-0 border border-light shadow-sm pointer";
    }*/

    var convertedValue = convertValue(
      this.props.categoryAmount
    ).toLocaleString();
    var convertedValueArray = convertedValue.split(" ");

    return (
      <div className="col-lg col-md-4 col-sm-6 p-1 m-0 text-center">
        <div
          className={this.props.className + " row p-0 m-0 shadow-sm pointer"}
          onClick={this.props.onClickEvent}
          onMouseEnter={this.props.onHoverEvent}
          onMouseLeave={this.props.onHoverEvent}
        >
          <div className="col bg-light">
            <div className="col-12 p-2">
              <img
                className="unit-img w-25 display-none"
                src={this.props.srcCategory}
                alt={this.props.alt}
              />
              <h6 className="p-1 m-0 text-dark text-center">
                {titleCase(this.props.categoryName)}
              </h6>
            </div>
          </div>

          <div className="col-12">
            <h1 className="p-2 m-0 text-info">
              <span className="small">₱</span>
              <span className="">{convertedValueArray.slice(0, 1)}</span>
              <span className="small">{convertedValueArray.slice(1)}</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
