"use strict";

let elementToPaint;
let selectedColor;

const features = {
  dragon: false,
  smiley: false,
  snail: false,
  pizza: false,
  spiderweb: false,
  PP: false,
  panther: false,
  money: false,
};

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("hat.svg");
  let mySvgData = await response.text();
  document.querySelector(".product-image").innerHTML = mySvgData;
  const newDiv = document.createElement("ul");
  newDiv.classList.add("patch-container");
  document.querySelector(".product-image").appendChild(newDiv);
  //svg curve data//
  let response2 = await fetch("assets/hat-curve.svg");
  const hatCurve = await response2.text();
  document.querySelector("#curvesvg").innerHTML = hatCurve;

  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));

  startManipulatingTheSvg();
}

let patch = null;
let curve = null;

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
  this.style.filter = "brightness(110%)";
}

function outCap() {
  this.style.filter = "brightness(100%)";
}

///////////////////////////////////Configurator pt 2///////////////////////////////

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"

  // If feature is (now) turned on:
  // - mark target as chosen (add class "chosen")
  // - un-hide the feature-layer(s) in the #product-preview;
  // - create featureElement and append to #selected ul
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - no longer mark target as chosen
  // - hide the feature-layer(s) in the #product-preview
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM
  let selectedFeature = createFeatureElement(feature);

  if (features[feature] === false) {
    // feature added
    features[feature] = true;
    target.classList.add("chosen");

    patch = document.querySelector(".patch-container");
    //curve//
    curve = document.querySelector("#theCurve").getAttribute("d");
    patch.style.offsetPath = `path("${curve}")`;

    patch.appendChild(selectedFeature);

    // TODO: More code
  } else {
    // feature removed
    features[feature] = false;
    target.classList.remove("chosen");
    document.querySelector(`[data-feature="${feature}"]`).remove();
    console.log(`Feature ${feature} is turned off!`);

    // TODO: More code
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `assets/${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
