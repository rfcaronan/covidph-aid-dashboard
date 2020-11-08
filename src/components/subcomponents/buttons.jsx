import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ResetButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={"my-2 btn btn-secondary shadow " + props.className}
    >
      Clear filter
    </button>
  );
};

export const SaveAs = (props) => {
  return (
    <div className="">
      <button id="download" className="btn btn-light shadow-sm">
        <FontAwesomeIcon icon="download" size={"md"} />{" "}
        <span className="small"> Save image</span>
      </button>
    </div>
  );
};

export const BasicButton = (props) => {
  return (
    <div className="">
      <button
        onClick={props.onClick}
        type="button"
        className={"btn btn-light shadow-sm " + props.className}
      >
        {" "}
        {props.buttonLabel}
      </button>
    </div>
  );
};
