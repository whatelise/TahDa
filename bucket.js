"use strict";

let elementToPaint;
let selectedColor;

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("hat.svg");
  let mySvgData = await response.text();
  document.querySelector(".product-image").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  const clickElm = document.querySelectorAll(".g_interact");
  clickElm.forEach((el) => (el.style.fill = "lightgray"));
  clickElm.forEach((el) => el.addEventListener("click", storeValue));
  document.querySelectorAll(".circle").forEach((el) => el.addEventListener("click", choseColor));
  //hover
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseover", hoverCap));
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseout", outCap));
}
function choseColor() {
  selectedColor = getComputedStyle(this).backgroundColor;
  console.log(selectedColor);
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseover", hoverCap));
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseout", outCap));
}

function storeValue() {
  this.style.fill = selectedColor;
}

function hoverCap() {
  console.log(this);
  this.style.filter = "brightness(110%)";
}

function outCap() {
  this.style.filter = "brightness(100%)";
}
