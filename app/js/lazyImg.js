"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var images = document.querySelectorAll("img");
var options = {
  // If the image gets within 50px in the Y axis, start the download.
  root: null,
  // Page as root
  rootMargin: "50px 0px",
  threshold: 0.5
};

var fetchImage = function fetchImage(url) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
};

var loadImage = function loadImage(image) {
  var src = image.dataset.src;
  fetchImage(src).then(function () {
    image.src = src;
  });
};

var handleIntersection = function handleIntersection(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0) {
      loadImage(entry.target);
    }
  });
};

function imgLazy(imgs) {
  document.addEventListener("DOMContentLoaded", function () {
    _toConsumableArray(imgs).forEach(function (itemImg) {
      itemImg.setAttribute("src", itemImg.getAttribute("data-src"));
    });
  });
}

if (!("IntersectionObserver" in window)) {
  imgLazy(images);
} else {
  // The observer for the images on the page
  var observer = new IntersectionObserver(handleIntersection, options);
  images.forEach(function (img) {
    observer.observe(img);
  });
}