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
  board: [[1,2,3],
          [4,5,6],
          [7,8,9]],
  score: [0,0],
  turn: true; // true = X, false = O
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

var clearAll = function() {
  for (let i = 0; i < global.board[0].length; i++) {
    for((let x = 0; x < global.board[1].length; i++) {
      global.board[i][x] = " ";
    }
  }
};

$(document).ready(() => {
  canvas.addEventListener('click', userClick);
  document.getElementsById('reset').addEventListener('click', clearAll);
  console.log('It works.');
});
