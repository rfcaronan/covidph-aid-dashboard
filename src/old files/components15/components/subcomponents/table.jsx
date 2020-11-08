import React from "react";
import {
  parseInteger,
  parseIntegerMoney,
  CreateArrayBeneficiaryType,
} from "./functions";
import { InfoText } from "./infoText";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

export const Tables = (props) => {
  let data = CreateArrayBeneficiaryType(props.data);

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return <InfoText infoText={cell} />;
  };

  const columns = [
    {
      dataField: "beneficiaryType",
      text: "Beneciary",
      headerAlign: "center",
      classes: (cell, row, rowIndex, colIndex) => {
        return "text-pelorous clickable";
      },
      events: {
        onClick: props.onClick,
      },
    },
    {
      dataField: "beneficiaryValue",
      text: "No. Served",
      headerAttrs: { width: "23%" },
      type: "number",
      sort: true,
      headerAlign: "center",
      align: "right",
      formatter: parseInteger,
      /*sortCaret: caretDesign,*/
    },
    {
      dataField: "shareOfPop",
      text: "% of Actual Population",
      headerAttrs: { width: "23%" },
      sort: true,
      headerAlign: "center",
      align: "center",
      /*sortCaret: caretDesign,*/
    },
    {
      dataField: "value",
      text: "Amount",
      sort: true,
      headerAlign: "center",
      align: "right",
      formatter: parseIntegerMoney,
      /*sortCaret: caretDesign,*/
    },
    {
      dataField: "infoText",
      text: "",
      headerAttrs: { width: 30 },
      formatter: rankFormatter,
    },
  ];

  const defaultSorted = [
    {
      dataField: "value", // ignored if not match to any column .
      order: "desc", // desc or asc
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: data.length,
      },
    ],
  });
  return (
    <BootstrapTable
      keyField="index"
      data={data}
      columns={columns}
      responsive={true}
      hover={true}
      bordered={false}
      condensed={false}
      defaultSorted={defaultSorted}
      pagination={pagination}
      headerClasses="noBorderOnClick caret"
      noDataIndication="There is no data for this item."
    />
  );
};
