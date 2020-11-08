import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import Header from "./components/header";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faInfoCircle,
  faCoins,
  faCreditCard,
  faShoppingCart,
  faPlaneDeparture,
  faCog,
  faHouseUser,
  faPeopleCarry,
  faUniversalAccess,
  faUsers,
  faBusinessTime,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faInfoCircle,
  fab,
  faCoins,
  faCreditCard,
  faShoppingCart,
  faPlaneDeparture,
  faCog,
  faHouseUser,
  faPeopleCarry,
  faUniversalAccess,
  faUsers,
  faBusinessTime,
  faCaretDown,
  faCaretUp
);

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <style>{"body { background-color: #fafafa ; }"}</style>
        <title>Covid-19 Aid Spending</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <div className="overflow-auto pl-2">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </React.Fragment>
    /*<React.Fragment>
      <Helmet>
        <style>{"body { background-color: #fafafa ; }"}</style>
        <title>Covid-19 Aid Spending</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <div className="overflow-auto pl-2">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </React.Fragment>*/
  );
}

export default App;
