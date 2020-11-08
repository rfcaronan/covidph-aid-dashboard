import React, { Component } from "react";

export function App() {
  function greeting() {
    console.log("hello!");
    waveHello();
  }

  function waveHello() {
    console.log("👋");
  }
}
