import React, { Component } from "react";
import { DataParser } from "./data";

class Charts extends Component {
  state = { posts: getData() };
  render() {
    return <div>{this.state.posts.map((d) => [d.Amount])}</div>;
  }
}

export default Charts;
