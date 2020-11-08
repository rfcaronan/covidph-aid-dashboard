import React, { Component } from "react";
import { getData } from "../components/dataService";
import { BarChart } from "../components/charts";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getData(),
      });
    }, 5000);
  }

  render() {
    return (
      <div className="App">
        <BarChart
          data={this.state.data[0].data}
          title={this.state.data[0].title}
          color="#B08EA2"
        />
      </div>
    );
  }
}

export default App;

/*import React from "react";
import "./App.css";
import Chart from "./components4/charts2";

/* <Helmet>
      <style>{"body { background-color: #fafafa ; }"}</style>
  </Helmet>*/

/*function App() {
  return (
    <div>
      <Chart />
    </div>
  );
}

export default App;*/
