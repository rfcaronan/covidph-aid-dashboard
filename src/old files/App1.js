import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import NavBar from "../components4/navbar";
//import Counters from "./components/counters";
import Units from "../components4/units";
import Charts from "../components4/charts2";

/* <Helmet>
      <style>{"body { background-color: #fafafa ; }"}</style>
  </Helmet>*/

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <style>{"body { background-color: #fafafa ; }"}</style>
      </Helmet>
      <div className="mx-3">
        <div>
          <NavBar />
        </div>
        <main>
          <Units />
          <Charts />
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
