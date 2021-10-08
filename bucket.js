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
function startManipulatingTheSvg() {
  const clickElm = document.querySelectorAll(".g_interact");
  clickElm.forEach((el) => (el.style.fill = "grey"));
  clickElm.forEach((el) => el.addEventListener("click", storeValue));
  document.querySelectorAll(".color-btn").forEach((el) => el.addEventListener("click", choseColor));
  //hover
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseover", hoverCap));
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseout", outCap));
}
function choseColor() {
  selectedColor = this.getAttribute("fill");
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseover", hoverCap));
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseout", outCap));
}

function storeValue() {
  this.style.fill = selectedColor;
}

function hoverCap() {
  console.log(this);
  this.style.filter = "brightness(140%)";
}

function outCap() {
  this.style.filter = "brightness(100%)";
}
