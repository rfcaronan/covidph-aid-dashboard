// Import React DOM
import React, { Component } from "react";

export const Tables = (props) => {
  return (
    <table className="table table table-borderless table-hover table-responsive-sm">
      <thead className="thead-small">{props.tableHeader}</thead>
      <tbody>{props.tableBody}</tbody>
    </table>
  );
};
