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
  //parseInteger,
  //parseIntegerMoney,
  CreateArrayTopThreeSource,
  sentenceCase,
} from "./functions";

export const Beneficiaries = (props) => {
  let data = CreateArrayBeneficiaryType(props.data);

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return <InfoText infoText={cell} />;
  }

  function valueFormatter(cell) {
    return "₱" + convertValue(cell);
  }

  const columns = [
    {
      dataField: "label",
      text: "Beneciary",
      headerAttrs: { width: "28%" },
      headerAlign: "center",
      formatter: sentenceCase,
      classes: (cell, row, rowIndex, colIndex) => {
        return "text-pelorous clickable";
      },
      events: {
        onClick: props.onClick,
      },
    },
    {
      dataField: "beneficiaryCategory",
      text: "Unit",
      headerAlign: "center",
    },
    {
      dataField: "popOfBeneficiaryCategory",
      text: "Population of Unit",
      type: "number",
      sort: false,
      headerAlign: "center",
      align: "right",
      /*sortCaret: caretDesign,*/
    },
    {
      dataField: "beneficiaryValue",
      text: "Actual Served",
      type: "number",
      sort: false,
      headerAlign: "center",
      align: "right",
      formatter: convertValue,
      /*sortCaret: caretDesign,*/
    },

    {
      dataField: "shareOfPop",
      text: "% of Served to Population of Unit",
      sort: false,
      headerAlign: "center",
      align: "center",
      classes: (cell, row, rowIndex, colIndex) => {
        return cell > 100 || cell < 0 ? "text-warning" : "text-pelorous";
      },
      /*sortCaret: caretDesign,*/
    },
    {
      dataField: "value",
      text: "Actual Spent",
      type: "number",
      sort: true,
      headerAlign: "center",
      align: "right",
      formatter: valueFormatter,
      /*sortCaret: caretDesign,*/
    },
    {
      dataField: "infoText",
      text: "",
      headerAttrs: { width: 10 },
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
