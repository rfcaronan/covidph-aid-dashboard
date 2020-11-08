// Import React DOM
import React from "react";

// Import chart dependencies;
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highchartsSankey from "highcharts/modules/sankey";
highchartsSankey(Highcharts);

export const SankeyChart = (props) => {
  const sankeyData = {
    title: {
      text: "",
    },
    series: [
      {
        keys: ["from", "to", "weight"],
        data: props.data,
        /*["DBM", "DSWD", 10],
          ["DSWD", "LGUs", 50],
          ["DBM", "DSWD", 10],
          ["DBM", "DOLE", 20],
          ["DBM", "CHED", 10],
          ["DBM", "DTI", 60],
          ["DTI", "LGUs", 10],*/
        type: "sankey",
        name: "Sankey demo",
      },
    ],
  };
  console.log(props.data);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={sankeyData}
      // constructorType="sankyChart"
    />
  );
};
