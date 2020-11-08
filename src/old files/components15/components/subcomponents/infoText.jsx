import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
