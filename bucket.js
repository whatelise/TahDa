"use strict";

let elementToPaint;
let selectedColor;

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("hat.svg");
  let mySvgData = await response.text();
  document.querySelector(".product-display").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("svg loaded");
}
