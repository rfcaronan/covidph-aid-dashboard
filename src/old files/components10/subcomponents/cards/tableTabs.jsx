// Import React DOM
import React, { Component } from "react";

// Import functions
import { parseInteger } from "../functions";

// Import other dependencies
import { Tables } from "./table";

export const TablesForTabs = (props) => {
  return (
    <Tables
      tableHeader={
        <tr>
          <th scope="col">Amount</th>
          <th scope="col">Beneficiaries</th>
          <th scope="col" style={{ width: "10%" }}>
            % of Total Population
          </th>
        </tr>
      }
      tableBody={props.data
        .filter(({ aidType }) => aidType === props.aidType)
        .map((d, i) => (
          <tr key={i}>
            <td>{parseInteger(d.value)}</td>
            <td>
              {parseInt(d.beneficiaryValue).toLocaleString()}{" "}
              {d.beneficiaryType}
            </td>
            <td>{parseInteger(d.shareOfPop)}%</td>
          </tr>
        ))}
    />
  );
};
