"use strict";

let elementToPaint;
let selectedColor;

let allHats = [];

let chosenColor = {
  top: "",
  rim: "",
  bottom: "",
};

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
  const clone = document.querySelector("template").content.cloneNode(true);
  clone.querySelector(".product-div").innerHTML = mySvgData;
  const newDiv = document.createElement("ul");
  newDiv.classList.add("patch-container");
  /*  const hatCurve = document.querySelector(); */
  clone.querySelector(".product-div").appendChild(newDiv);
  clone.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
  const clickElm = clone.querySelectorAll(".g_interact");
  clickElm.forEach((el) => (el.style.fill = "lightgray"));
  clickElm.forEach((el) => el.addEventListener("click", storeColor));
  startManipulatingTheSvg();

  //fetch cursor
  fetch("assets/color-dot.svg")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      document.querySelector("#cursor").innerHTML = data;
    });

  document.querySelector(".product-image").appendChild(clone);
}

function startManipulatingTheSvg() {
  document.querySelectorAll(".circle").forEach((el) => el.addEventListener("click", choseColor));
  setUpButtons();
}

function setUpButtons() {
  //hover
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseover", hoverCap));
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseout", outCap));
  //popup button
  document.querySelector(".popupbutton").addEventListener("click", () => {
    document.querySelector(".popup").classList.add("hidden");
  });
  //save selection
  document.querySelector("#save").addEventListener("click", saveSelection);
}

function choseColor() {
  //get color
  selectedColor = getComputedStyle(this).backgroundColor;
  console.log(selectedColor);

  //highligh hovered element
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseover", hoverCap));
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseout", outCap));

  //cursor
  document.querySelector("body").addEventListener("mousemove", cursorPosition);
  const svgFill = document.querySelector("#pointer");
  document.querySelector("body").classList.add("no-cursor");
  document.querySelectorAll(".pointer").forEach((pointer) => {
    pointer.setAttribute("fill", selectedColor);
    console.log("fill is running");
    console.log(pointer);
  });
}

function storeColor() {
  this.style.fill = selectedColor;
  elementToPaint = this.getAttribute("id");
  chosenColor[elementToPaint] = selectedColor;
}

function saveSelection() {
  createPartsObject();
  localStorage.setItem("chosenColor", JSON.stringify(chosenColor));
  const localStorageObject = localStorage.getItem("chosenColor");
  console.log(JSON.parse(localStorageObject));
  allHats.push(localStorageObject);
  console.log("allHats " + allHats);
  document.querySelector("#save").removeEventListener("click", saveSelection);
  displaySelection();
  setUpButtons();
}

function createPartsObject() {
  const activeParts = document.querySelectorAll(".patch-container li");
  activeParts.forEach((activepart) => {
    const partID = activepart.dataset.feature;
    features[partID] = true;
    chosenColor[partID] = true;
    allHats.push(chosenColor[features]);
  });
}

function displaySelection() {
  //fetch bucket cursor
  fetch("assets/bucket-cursor.svg")
    .then(function (res) {
      return res.text();
    })
    .then(function (data) {
      document.querySelector("#cursor").innerHTML = data;
    });
  const clone = document.querySelector("#header").content.cloneNode(true);
  clone.querySelector(".product-div").innerHTML = mySvgData;
  const newDiv = document.createElement("ul");
  newDiv.classList.add("patch-container");
  /*  const hatCurve = document.querySelector(); */
  clone.querySelector(".product-div").appendChild(newDiv);
  clone.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
  const clickElm = clone.querySelectorAll(".g_interact");
  clickElm.forEach((el) => (el.style.fill = "lightgray"));
  clickElm.forEach((el) => el.addEventListener("click", storeColor));
  startManipulatingTheSvg();
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

  //apply feature to dom

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
  let patchCount = document.querySelector(".patch-container").childElementCount;
  if (features[feature] === false) {
    // feature added
    if (patchCount < 3) {
      features[feature] = true;
      target.classList.add("chosen");
      document.querySelector(".patch-container").appendChild(selectedFeature);
      console.log(`Feature ${feature} is turned on!`);
      console.log("patchcount " + patchCount);
    } else {
      document.querySelector(".popup").classList.remove("hidden");
    }
    if (patchCount === 2) {
      document.querySelectorAll(".patch-container li").forEach((patchSvg) => {
        patchSvg.classList.add("perspective");
      });
    }

    // TODO: More code
  } else {
    // feature removed
    features[feature] = false;
    target.classList.remove("chosen");
    document.querySelector(`[data-feature="${feature}"]`).remove();
    console.log(`Feature ${feature} is turned off!`);

    document.querySelectorAll(".perspective").forEach((patchSvg) => {
      patchSvg.classList.remove("perspective");
    });
  }
  // TODO: More code
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

function cursorPosition(e) {
  const cursor = document.querySelector("#cursor");
  cursor.style.display = `block`;
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
}
