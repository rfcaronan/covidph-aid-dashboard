// Import React DOM
import React, { Component } from "react";

// Import other dependencies
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Import functions
import { titleCase } from "../functions";

export const OverlayTooltip = (props) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{titleCase(props.tooltipText)}</Tooltip>}
    >
      <button className="d-inline btn p-0 m-0 bg-white text-info">
        {props.icon}{" "}
        <span className="display-none">{titleCase(props.tooltipObject)}</span>
      </button>
    </OverlayTrigger>
  );
};
