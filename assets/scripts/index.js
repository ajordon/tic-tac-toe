'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./user-manager');
// require('./game-manager');

// load sass manifest
require('../styles/index.scss');

let global = {
  "game": [" "," "," "," "," "," "," "," "," "],
  "score": [0,0],
  "turn": true, // true = X, false = O
  "turnCount": 1,
};

let lastPos = 0;
let clearAll = function() {
  $('.box').empty();
  $('.box').css("background-color", "#151469");
  global.turnCount = 1;
};

let updateScore = function() {
  document.querySelector('.score').innerHTML = "Score: <br />	<small>X - </small>" + global.score[0] +
  " / <small> O - </small>"  + global.score[1];
};

let winAnnounce = function(win) {
  switch (win) {
    case "x":
      $('.winner').text("X Wins!").css("color", "green");
      $('.winner').show();
      global.score[0]++;
      updateScore();
      global.turn = false;
      setTimeout(clearAll, 3000);
      break;

    case "o":
      $('.winner').text("O Wins!").css("color", "blue");
      $('.winner').show();
      global.score[1]++;
      updateScore();
      global.turn = true;
      setTimeout(clearAll, 3000);
      break;

    case "d":
      $('.winner').text("Draw!");
      $('.winner').show();
      setTimeout(clearAll, 3000);
      break;

    default:
      break;
  }
};

let winListner = function() {
  let row1 = $('#top-left1').text() + $('#top-middle2').text() + $('#top-right3').text();
  let row2 = $('#middle-left4').text() + $('#middle-middle5').text() + $('#middle-right6').text();
  let row3 = $('#bottom-left7').text() + $('#bottom-middle8').text() + $('#bottom-right9').text();

  let colm1 = $('#top-left1').text() + $('#middle-left4').text() + $('#bottom-left7').text();
  let colm2 = $('#top-middle2').text() + $('#middle-middle5').text() + $('#bottom-middle8').text();
  let colm3 = $('#top-right3').text() + $('#middle-right6').text() + $('#bottom-right9').text();

  let crossright = $('#top-left1').text() + $('#middle-middle5').text() + $('#bottom-right9').text();
  let crossleft = $('#top-right3').text() + $('#middle-middle5').text() + $('#bottom-left7').text();

  if (row1 === "XXX" || row2 === "XXX" || row3 === "XXX" ||
      colm1 === "XXX" || colm2 === "XXX" || colm3 === "XXX" ||
      crossright === "XXX" || crossleft === "XXX") {
        winAnnounce("x");
  } else if (row1 === "OOO" || row2 === "OOO" || row3 === "OOO" ||
      colm1 === "OOO" || colm2 === "OOO" || colm3 === "OOO" ||
      crossright === "OOO" || crossleft === "OOO") {
          winAnnounce("o");
  }else if (global.turnCount === 10) {
    winAnnounce("d");
  }
};

// let updateBoard = function(e, lastPos) {
//   if (global.turnCount === 1) {
//     $.ajax({
//       url: myApp.baseUrl + '/create',
//       method: 'POST',
//       data: {
//         "game": {
//           "id": 1,
//           "cells": ["","","","","","","","",""],
//           "over": false,
//           "player_x": {
//             "id": myApp.user.id,
//             "email": myApp.user.email
//           },
//           "player_o": null
//         }
//       }
//     }).done(function(data) {
//       myApp.user.game = data.game;
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
//   }
//   else {
//     $.ajax({
//       url: myApp.baseUrl + '/update',
//       method: 'PATCH',
//       data: {
//         "game": {
//           "cell": {
//             "index": lastPos,
//             "value": e.target.text()
//           },
//           "over": false
//         }
//       }
//     }).done(function(data) {
//       myApp.user.game = data.game;
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
//   }
// };

$(document).ready(() => {
  //Initialze Board
  document.querySelector('.turn').innerHTML = "Turn: <br /><strong>X</strong>";
  $('.winner').hide();
  $('.gameCount').hide();
  $('.sign-out1').hide();
  $('.change-password1').hide();

  //Declair reset button
  $('.reset').on('click', function() {
    $('.box').empty();
    $('.box').css("background-color", "#151469");
    $('.winner').hide();
    global.score.fill(0);
    updateScore();
    global.turnCount = 1;
  });

  //Gameboard click logic
  $('.gameboard').on('click', function(event) {
    event.preventDefault();
    let gameboardBox = $(event.target);
    $('.winner').hide();
    lastPos = gameboardBox.attr("position");
    if (gameboardBox.text() !== "") {
      $('.winner').show().text("The box is taken!");
      return;
    }

    if (global.turn === true) {
      gameboardBox.text("X");
      gameboardBox.css("background-color", "green");
      global.turn = false;
      global.game[lastPos] = "X";
      document.querySelector('.turn').innerHTML = "Turn: <br /><strong>O</strong>";
    } else {
      gameboardBox.text("O");
      gameboardBox.css("background-color", "blue");
      global.turn = true;
      global.game[lastPos] = "O";
      document.querySelector('.turn').innerHTML = "Turn: <br /><strong>X</strong>";
    }

    global.turnCount++;
    winListner();
    // updateBoard(event, lastPos);
  });

  updateScore();
});
