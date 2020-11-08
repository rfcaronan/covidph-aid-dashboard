import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { InfoText } from "./infoText";

import {
  convertValue,
  CreateArrayBeneficiaryType,
  CreateArrayExternalSource,
  CreateArrayInternalSource,
  parseInteger,
  parseIntegerMoney,
  CreateArrayTopThreeSource,
} from "./functions";

export const Beneficiaries = (props) => {
  let data = CreateArrayBeneficiaryType(props.data);

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return <InfoText infoText={cell} />;
  }

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
      type: "number",
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
      responsive={true}
      hover={true}
      bordered={false}
      condensed={false}
      defaultSorted={defaultSorted}
      pagination={pagination}
      headerClasses="noBorderOnClick caret"
      noDataIndication="There is no data for this item."
      bootstrap4
      data={data}
      columns={columns}
      {...props.baseProps}
    />
  );
};

export const ExternalSource = (props) => {
  let data = CreateArrayExternalSource(props.data);

  function valueFormatter(cell) {
    return "₱" + convertValue(cell);
  }

  /*49.8756 exchange rate=average from January to October*/

  const columns = [
    {
      dataField: "label",
      text: "Source",
      headerAlign: "center",
      classes: (cell, row, rowIndex, colIndex) => {
        return "text-pelorous";
      },
    },
    {
      dataField: "convertedValue",
      text: "Amount",
      type: "number",
      headerAttrs: { width: "30%" },
      headerAlign: "center",
      align: "right",
      formatter: valueFormatter,
    },
  ];

  const defaultSorted = [
    {
      dataField: "convertedValue", // ignored if not match to any column .
      order: "desc", // desc or asc
    },
  ];

  return (
    <BootstrapTable
      keyField="index"
      responsive={true}
      bordered={false}
      condensed={true}
      defaultSorted={defaultSorted}
      headerClasses="noBorderOnClick caret"
      noDataIndication="There is no data for this item."
      bootstrap4
      data={data}
      columns={columns}
      {...props.baseProps}
    />
  );
};

export const InternalSource = (props) => {
  let data = CreateArrayInternalSource(props.data);

  function valueFormatter(cell) {
    return "₱" + convertValue(cell);
  }

  /*49.8756 exchange rate=average from January to October*/

  const columns = [
    {
      dataField: "label",
      text: "Source",
      headerAlign: "center",
      classes: (cell, row, rowIndex, colIndex) => {
        return "text-pelorous";
      },
    },
    {
      dataField: "value",
      text: "Amount",
      type: "number",
      headerAlign: "center",
      headerAttrs: { width: "30%" },
      align: "right",
      formatter: valueFormatter,
    },
  ];

  const defaultSorted = [
    {
      dataField: "value", // ignored if not match to any column .
      order: "desc", // desc or asc
    },
  ];

  return (
    <BootstrapTable
      keyField="index"
      responsive={true}
      bordered={false}
      condensed={true}
      defaultSorted={defaultSorted}
      headerClasses="noBorderOnClick caret"
      noDataIndication="There is no data for this item."
      bootstrap4
      data={data}
      columns={columns}
      {...props.baseProps}
    />
  );
};

export const TopFinanciers = (props) => {
  let data = CreateArrayTopThreeSource(props.data);
  let topThree = data.slice(0, 3);

  function valueFormatter(cell) {
    return "₱" + convertValue(cell);
  }

  /*49.8756 exchange rate=average from January to October*/

  const columns = [
    {
      dataField: "label",
      text: "Source",
      headerAlign: "center",
      classes: (cell, row, rowIndex, colIndex) => {
        return "text-pelorous";
      },
    },
    {
      dataField: "convertedValue",
      text: "Amount",
      type: "number",
      headerAlign: "center",
      headerAttrs: { width: "30%" },
      align: "right",
      formatter: valueFormatter,
    },
  ];

  const defaultSorted = [
    {
      dataField: "convertedValue", // ignored if not match to any column .
      order: "desc", // desc or asc
    },
  ];

  return (
    <BootstrapTable
      keyField="index"
      responsive={true}
      bordered={false}
      condensed={true}
      defaultSorted={defaultSorted}
      headerClasses="noBorderOnClick caret"
      noDataIndication="There is no data for this item."
      bootstrap4
      data={topThree}
      columns={columns}
      {...props.baseProps}
    />
  );
};
