// Import React DOM
import React from "react";

// Import chart dependencies;
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highchartsSankey from "highcharts/modules/sankey";
highchartsSankey(Highcharts);

export const SankeyChart = (props) => {
  //constructorType="sankyChart"
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={props.sankeyOptions}
      // constructorType="sankyChart"
    />
  );
};
