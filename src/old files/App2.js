import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";

/* <Helmet>
      <style>{"body { background-color: #fafafa ; }"}</style>
  </Helmet>*/

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <style>{"body { background-color: #fafafa ; }"}</style>
      </Helmet>
      <div className="container p">
        <NavBar />
        <Dashboard />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
