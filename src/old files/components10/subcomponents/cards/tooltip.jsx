// Import React DOM
import React, { Component } from "react";

// Import other dependencies
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
      {props.tooltipObject}
    </OverlayTrigger>
  );
};
