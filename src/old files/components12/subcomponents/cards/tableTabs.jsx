// Import React DOM
import React, { Component } from "react";

// Import functions
import {
  parseInteger,
  parseIntegerMoney,
  titleCase,
  CreateArrayBeneficiaryType,
} from "../functions";

// Import other dependencies
import { Tables } from "./table";
import { InfoText } from "./infoText";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
//import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

// Import other dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TablesForTabs = (props) => {
  /*const CreateTabsData = () => {
    let newArray = [];
    props.data
      .filter(
        ({ beneficiaryCategory }) =>
          beneficiaryCategory === props.beneficiaryCategory
      )
      .reduce(function (res, item) {
        if (!res[item.beneficiaryType]) {
          res[item.beneficiaryType] = {
            index: item.index,
            assistanceType: item.assistanceType,
            beneficiaryType: item.beneficiaryType,
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
  };*/

  /* const columns = [
    {
      index: "index",
      dataField: "assistanceType",
      text: "Program",
    },
    {
      index: "index",
      dataField: "beneficiaryType",
      text: "Beneficiaries",
    },
    {
      index: "index",
      dataField: "beneficiaryValue",
      text: "Served",
    },
    {
      index: "index",
      dataField: "name",
      text: "% of Target",
    },
    {
      index: "index",
      dataField: "value",
      text: "Amount",
    },
  ];*/

  let data = CreateArrayBeneficiaryType(props.data);

  //const headerSortingStyle = { backgroundColor: "#c8e6c9" };

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return <InfoText infoText={cell} />;
  }

  /*sortCaret: (order, column) => {
    if (!order) return <FontAwesomeIcon icon="caret-down" size={"md"} />;
    else if (order === "asc")
      return (
        <span>
          &nbsp;&nbsp;
          <FontAwesomeIcon icon="caret-up" size={"md"} />
          <font color="red">
            {" "}
            <FontAwesomeIcon icon="caret-down" size={"md"} />
          </font>
        </span>
      );
    else if (order === "desc")
      return (
        <span>
          &nbsp;&nbsp;
          <font color="red">
            <FontAwesomeIcon icon="caret-down" size={"md"} />
          </font>
          <FontAwesomeIcon icon="caret-up" size={"md"} />
        </span>
      );
    return null;
  },*/

  /*function caretDesign(order, column) {
    if (!order)
      return (
        <span style={{ color: "#868e96" }}>
          &nbsp;
          <FontAwesomeIcon icon="caret-up" size={"fa-3x"} />
          <FontAwesomeIcon icon="caret-down" />
        </span>
      );
    else if (order === "asc")
      return (
        <span>
          &nbsp;
          <FontAwesomeIcon icon="caret-up" size={"md"} />
          <font color="#868e96">
            <FontAwesomeIcon icon="caret-down" size={"md"} />
          </font>
        </span>
      );
    else if (order === "desc")
      return (
        <span>
          &nbsp;
          <font color="#868e96">
            <FontAwesomeIcon icon="caret-up" size={"md"} />
          </font>
          <FontAwesomeIcon icon="caret-down" size={"md"} />
        </span>
      );
    return null;
  }*/

  const columns = [
    /*{
      dataField: "assistanceType",
      text: "Program",
    },*/
    {
      dataField: "beneficiaryType",
      text: "Beneciary",
      headerAlign: "center",
      classes: (cell, row, rowIndex, colIndex) => {
        return "text-info clickable";
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

  const { SearchBar } = Search;
  //const { ExportCSVButton } = CSVExport;
  /*const options = {
    defaultSortName: "value", // default sort column name
    defaultSortOrder: "desc", // default sort order

    page: 1, // which page you want to show as default
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
    ], // you can change the dropdown list for size per page
    sizePerPage: 5, // which size per page you want to locate as default
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3, // the pagination bar size.
    prePage: "Prev", // Previous page button text
    nextPage: "Next", // Next page button text
    firstPage: "First", // First page button text
    lastPage: "Last", // Last page button text
    paginationShowsTotal: false, // Accept bool or function
    paginationPosition: "bottom", // default is bottom, top and both is all available
    // hideSizePerPage: true > You can hide the dropdown for sizePerPage
    // alwaysShowAllBtns: true // Always show next and previous button
    // withFirstAndLast: false > Hide the going to First and Last page button
  };*/
  /*const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(e.target.innerHTML);
    },
  };*/

  return (
    <ToolkitProvider
      bootstrap4
      keyField="index"
      data={data}
      columns={columns}
      //hover
      search
      exportCSV
    >
      {(props) => (
        <React.Fragment>
          <div className="d-flex justify-content-between">
            {/*<ExportCSVButton className="btn btn-light mb-2" {...props.csvProps}>
              Export CSV
      </ExportCSVButton>*/}

            <SearchBar {...props.searchProps} />
          </div>
          <BootstrapTable
            responsive={true}
            hover={true}
            bordered={false}
            condensed={false}
            defaultSorted={defaultSorted}
            pagination={pagination}
            headerClasses="noBorderOnClick caret"
            noDataIndication="There is no data for this item."
            {...props.baseProps}
          />
        </React.Fragment>
      )}
    </ToolkitProvider>

    /*<BootstrapTable
        data={data}
        options={options}
        version="4"
        hover
        search
        pagination
        exportCSV
      >
        <TableHeaderColumn dataField="assistanceType">
          Program
        </TableHeaderColumn>
        <TableHeaderColumn dataField="beneficiaryType">
          Beneficiaries
        </TableHeaderColumn>
        <TableHeaderColumn dataField="beneficiaryValue" dataSort>
          Served
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataSort>
          % of Target
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="value"
          isKey={true}
          dataSort={true}
          dataFormat={priceFormatter}
        >
          Amount
        </TableHeaderColumn>
      </BootstrapTable>*/
  );
};

/*export const TablesForTabs = (props) => {
  const CreateTabsData = () => {
    let newArray = [];
    props.data
      .filter(
        ({ beneficiaryCategory }) =>
          beneficiaryCategory === props.beneficiaryCategory
      )
      .reduce(function (res, item) {
        if (!res[item.beneficiaryType]) {
          res[item.beneficiaryType] = {
            assistanceType: item.assistanceType,
            beneficiaryType: item.beneficiaryType,
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
          <th scope="col" style={{ width: "30%" }}>
            Program
          </th>
          <th scope="col">Beneficiaries</th>
          <th scope="col">Served</th>
          <th scope="col">% of Target</th>
          <th scope="col">Amount</th>
        </tr>
      }
      tableBody={CreateTabsData(props.data).map((item, index) => (
        <tr key={item.index}>
          <td>
            {item.assistanceType} {}
            <InfoText infoText={item.infoText} />
          </td>
          <td className="text-info">{titleCase(item.beneficiaryType)}</td>
          <td class="text-right">
            {parseInt(item.beneficiaryValue).toLocaleString()}{" "}
          </td>
          <td>{}</td>
          <td class="text-right">{parseInteger(item.value)}</td>
        </tr>
      ))}
    />
  );
};*/
