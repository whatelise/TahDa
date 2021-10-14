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
  let response2 = await fetch("assets/hat-curve.svg");
  let mySvgData2 = await response2.text();
  document.querySelector(".product-image").innerHTML = mySvgData;
  const newDiv = document.createElement("ul");
  newDiv.classList.add("patch-container");
  /*  const hatCurve = document.querySelector(); */
  document.querySelector(".product-image").appendChild(newDiv);
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
  startManipulatingTheSvg();

  //fetch cursor
  fetch("assets/color-dot.svg")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      document.querySelector("#cursor").innerHTML = data;
    });
}

function startManipulatingTheSvg() {
  const clickElm = document.querySelectorAll(".g_interact");
  clickElm.forEach((el) => (el.style.fill = "lightgray"));
  clickElm.forEach((el) => el.addEventListener("click", storeValue));
  document.querySelectorAll(".circle").forEach((el) => el.addEventListener("click", choseColor));
  //hover
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseover", hoverCap));
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseout", outCap));

  //popup button
  document.querySelector(".popupbutton").addEventListener("click", () => {
    document.querySelector(".popup").classList.add("hidden");
  });
}
function choseColor() {
  //get color
  document.querySelectorAll(".circle").forEach((el) => el.classList.remove("chosen-color"));
  selectedColor = getComputedStyle(this).backgroundColor;
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseover", hoverCap));
  document.querySelectorAll("path").forEach((el) => el.addEventListener("mouseout", outCap));
  this.classList.add("chosen-color");
  //cursor
  document.querySelector("body").addEventListener("mousemove", cursorPosition);
  const svgFill = document.querySelector("#pointer");
  document.querySelector("body").classList.add("no-cursor");
  document.querySelectorAll(".pointer").forEach((pointer) => {
    pointer.setAttribute("fill", selectedColor);
  });
}

function storeValue() {
  this.style.fill = selectedColor;
  console.log("selected color" + selectedColor);
}

function hoverCap() {
  this.style.filter = "brightness(114%)";
  this.style.transition = "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)";
}

function outCap() {
  this.style.filter = "brightness(100%)";
}

///////////////////////////////////Configurator pt 2///////////////////////////////

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  let selectedFeature = createFeatureElement(feature);
  let patchCount = document.querySelector(".patch-container").childElementCount;
  if (features[feature] === false) {
    // Add feature
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
  } else {
    // Remove feature
    features[feature] = false;
    target.classList.remove("chosen");
    document.querySelector(`[data-feature="${feature}"]`).remove();
    console.log(`Feature ${feature} is turned off!`);

    document.querySelectorAll(".perspective").forEach((patchSvg) => {
      patchSvg.classList.remove("perspective");
    });
  }
}

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
