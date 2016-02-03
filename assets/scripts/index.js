'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

let global = {
  "board": [[1,2,3],
          [4,5,6],
          [7,8,9]],
  "score": [0,0],
  "turn": true, // true = X, false = O
  "turnCount": 1
};

let clearAll = function() {
  $('.box').empty();
  $('.box').css("background-color", "#151469");
  global.turnCount = 1;
};

let updateScore = function() {
  document.querySelector('.score').innerHTML = "Score: <br />	<small>X - </small>" + global.score[0] +
  " / <small> O - </small>"  + global.score[1];
};

let winListner = function() {
  let row1 = $('#top-left').text() + $('#top-middle').text() + $('#top-right').text();
  let row2 = $('#middle-left').text() + $('#middle-middle').text() + $('#middle-right').text();
  let row3 = $('#bottom-left').text() + $('#bottom-middle').text() + $('#bottom-right').text();

  let colm1 = $('#top-left').text() + $('#middle-left').text() + $('#bottom-left').text();
  let colm2 = $('#top-middle').text() + $('#middle-middle').text() + $('#bottom-middle').text();
  let colm3 = $('#top-right').text() + $('#middle-right').text() + $('#bottom-right').text();;

  let crossright = $('#top-left').text() + $('#middle-middle').text() + $('#bottom-right').text();
  let crossleft = $('#top-right').text() + $('#middle-middle').text() + $('#bottom-left').text();

  if (row1 === "XXX" || row2 === "XXX" || row3 === "XXX" ||
      colm1 === "XXX" || colm2 === "XXX" || colm3 === "XXX" ||
      crossright === "XXX" || crossleft === "XXX") {
        winAnnounce("x");
        // debugger;
  } else if (row1 === "OOO" || row2 === "OOO" || row3 === "OOO" ||
      colm1 === "OOO" || colm2 === "OOO" || colm3 === "OOO" ||
      crossright === "OOO" || crossleft === "OOO") {
          winAnnounce("o");
  }
  if (global.turnCount === 10) {
    winAnnounce("d");
  }
};

let winAnnounce = function(win) {
  switch (win) {
    case "x":
      $('.winner').text("X Wins!").css("color", "green");
      $('.winner').show();
      global.score[0]++;
      updateScore();
      global.turn = false;
      clearAll();
      break;

    case "o":
      $('.winner').text("O Wins!").css("color", "blue");
      $('.winner').show();
      global.score[1]++;
      updateScore();
      global.turn = true;
      clearAll();
      break;

    case "d":
      $('.winner').text("Draw!");
      $('.winner').show();
      clearAll();
      break;

    default:
      break;
  }

  updateScore();
  clearAll();
};

$(document).ready(() => {
  document.querySelector('.turn').innerHTML = "Turn: <br /><strong>X</strong>";
  $('.winner').hide();
  $('#reset').on('click', function() {
    $('.box').empty();
    $('.box').css("background-color", "#151469");
    $('.winner').hide();
    global.turnCount = 1;
  });

  $('#gameboard').on('click', function(event) {
    event.preventDefault();
    let gameboardBox = $(event.target);
    $('.winner').hide();
    if (gameboardBox.text() !== "") {
      $('.winner').show().text("The box is taken!");
      return;
    }
    if (global.turn === true) {
      gameboardBox.text("X");
      gameboardBox.css("background-color", "green");
      global.turn = false;
      document.querySelector('.turn').innerHTML = "Turn: <br /><strong>O</strong>";
    } else {
      gameboardBox.text("O");
      gameboardBox.css("background-color", "blue");
      global.turn = true;
      document.querySelector('.turn').innerHTML = "Turn: <br /><strong>X</strong>";
    }
    global.turnCount++;
    winListner();
  });

  updateScore();
});
