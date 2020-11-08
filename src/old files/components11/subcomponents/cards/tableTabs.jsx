// Import React DOM
import React, { Component } from "react";

// Import functions
import { parseInteger } from "../functions";

// Import other dependencies
import { Tables } from "./table";
import { InfoText } from "./infoText";

export const TablesForTabs = (props) => {
  const CreateTabsData = () => {
    let newArray = [];
    props.data
      .filter(({ aidType }) => aidType === props.aidType)
      .reduce(function (res, item) {
        if (!res[item.beneficiaryType]) {
          res[item.beneficiaryType] = {
            assistanceType: item.assistanceType,
            infoText: item.infoText,
            label: item.beneficiaryType,
            beneficiaryValue: 0,
            value: 0,
          };
          newArray.push(res[item.beneficiaryType]);
        }
        res[item.beneficiaryType].value += parseInt(item.value);
        res[item.beneficiaryType].beneficiaryValue += parseInt(
          item.beneficiaryValue
        );
        return res;
      }, {});
    return newArray;
  };

  return (
    <Tables
      tableHeader={
        <tr class="text-center">
          <th scope="col" style={{ width: "35%" }}>
            Program
          </th>
          <th scope="col" style={{ width: "35%" }}>
            Beneficiaries Served
          </th>
          <th scope="col" style={{ width: "10%" }}>
            % to Total Target
          </th>
          <th scope="col" style={{ width: "10%" }}>
            % to Total Population
          </th>
          <th scope="col">Amount</th>
        </tr>
      }
      tableBody={CreateTabsData(props.data).map((d, i) => (
        <tr key={i}>
          <td class="text-info">
            {d.assistanceType} {""}
            <InfoText infoText={d.infoText} />
          </td>

          <td>
            {parseInt(d.beneficiaryValue).toLocaleString()} {d.label}
          </td>
          <td>{props.shareOfPop}%</td>
          <td>{props.shareOfPop}%</td>
          <td class="text-right">{parseInteger(d.value)}</td>
        </tr>
      ))}
    />
  );
};
