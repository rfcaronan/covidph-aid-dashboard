import React, { Component } from "react";

export function greeting() {
  console.log("hello!");
  waveHello();
}

export function waveHello() {
  console.log("👋");
}

export function convertValue(value) {
  // Billions
  return Math.abs(Number(value)) >= 1.0e9
    ? Math.abs(Number(value)) / 1.0e9 + "B"
    : // Millions
    Math.abs(Number(value)) >= 1.0e6
    ? Math.abs(Number(value)) / 1.0e6 + "M"
    : // Thousands
    Math.abs(Number(value)) >= 1.0e3
    ? Math.abs(Number(value)) / 1.0e3 + "K"
    : Math.abs(Number(value));
}
