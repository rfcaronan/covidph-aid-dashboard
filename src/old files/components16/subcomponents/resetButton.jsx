import React from "react";

export const ResetButton = (props) => {
  return (
    <button onClick={props.onClick} type="button" className={props.className}>
      Clear filter
    </button>
  );
};

export default ResetButton;
