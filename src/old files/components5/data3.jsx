import React, { Component } from "react";

// Data generation
function getRandomArray(numItems) {
  // Create random array of objects
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: "Timeline",
    data: getRandomArray(150),
  });

  return data;
}
