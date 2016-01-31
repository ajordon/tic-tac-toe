'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

var canvas = document.getElementsById('gameboard');
var ctx = canvas.getContent("2d");

var global = {
  score: [0,0]
};

ctx.fillStyple = "#fff";
ctx.fill(10,10,10,100);

var winAnnounce = function() {
  var win = winListner();
  switch (win) {
    case "x":
      alert("X Wins!");
      global.score[0]++;
      clearAll();
      break;

    case "o":
      alert("O Wins!");
      global.score[1]++;
      clearAll();
      break;

    default:
      break;
  }

  updateScore();
  clearAll();
};

var updateScore = function() {};
var userClick = function () {};
var clearAll = function() {};

vvar

$(document).ready(() => {
  canvas.addEventListener('click', userClick);
  document.getElementsById('reset').addEventListener('click', clearAll);
  console.log('It works.');
});
