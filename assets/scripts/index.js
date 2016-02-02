'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

let global = {
  "board": [[1,2," "],
          [4,5,6],
          [7,8,9]],
  "score": [0,0],
  "turn": true, // true = X, false = O
  "turnCount": 0
};

let updateScore = function() {
  document.querySelector('.score').innerHTML = "	<small>X - </small>" + global.score[0] +
  "/ <small> O -</small>"  + global.score[1];
};

let clearAll = function() {
  for (let i = 0; i < global.board[0].length; i++) {
    for(let x = 0; x < global.board[1].length; i++) {
      global.board[i][x] = " ";
    }
  }
};

let winAnnounce = function() {
  // let win = winListner();
  switch (win) {
    case "x":
      alert("X Wins!");
      global.score[0]++;
      updateScore();
      global.turn = false;
      clearAll();
      break;

    case "o":
      alert("O Wins!");
      global.score[1]++;
      updateScore();
      global.turn = true;
      clearAll();
      break;

    default:
      break;
  }

  updateScore();
  clearAll();
};

$(document).ready(() => {
  // $('.turn').innerHTML = global.turn //Show the turn as x or o at the start
  $('#reset').on('click', clearAll);
  $('#gameboard').on('click', function(event) {
    event.preventDefault();
    let gameboardBox = $(event.target);
    if (global.turn === true) {
      gameboardBox.text("X");
      gameboardBox.css("background-color", "green");
      global.turn = false;
    } else {
      gameboardBox.text("O");
      gameboardBox.css("background-color", "blue");
      global.turn = true;
    }
    global.turnCount++;
    console.log(global.turnCount);
  });
  updateScore();
  console.log('It works.');
});
