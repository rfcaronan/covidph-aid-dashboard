// Import React DOM
import React, { Component } from "react";

// Import other dependencies
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";

// Import other dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InfoText = (props) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{props.infoText}</Tooltip>}
    >
      <FontAwesomeIcon icon="info-circle" size={"sm"} />
    </OverlayTrigger>
  );
};
