import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { titleCase } from "./functions";

export const OverlayTooltip = (props) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{titleCase(props.tooltipText)}</Tooltip>}
    >
      <button className="d-inline btn p-0 m-0 bg-white text-pelorous">
        {props.icon}{" "}
        <span className="display-none">{titleCase(props.tooltipObject)}</span>
      </button>
    </OverlayTrigger>
  );
};
