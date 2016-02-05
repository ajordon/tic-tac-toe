'use strict';

const myApp = {
    baseUrl: 'http://tic-tac-toe.wdibos.com',
};

$(document).ready(() => {
  //----------------SAVE GAME----------------
  if (!myApp.user.game) {
    console.error("No games for this user!");
  }
  $('').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/games/' + myApp.user.id,
      method: 'GET',
    }).done(function(data)  {
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        count++;
      }
      $('.gameCount').text("Total Games: " + count);
      $('.gameCount').show();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });


    $('').on('submit', function(e) {
      if(!myApp.user) {
        console.error("No User!");
      }
      var formDataGame = new FormData();
      e.preventDefault();
      $.ajax({
        url: myApp.baseUrl + '/create',
        method: 'POST',
        data: {
          "game": {
            "id": myApp.user.id,
            "cells": ["","","","","","","","",""],
            "over": false,
            "player_x": {
              "id": 1,
              "email": myApp.user
            },
            "player_o": null
          }
        }
      }).done(function(data) {
        myApp.user.game = data.game;
      })
    })
});

var formDataGame = new FormData();
e.preventDefault();
$.ajax({
  url: myApp.baseUrl + '/update',
  method: 'PATCH',
  data: {
    "game": {
      "cell": {
        "index": e.target.index()
        "value": e.target.text()
      },
      "over": false
    }
  }
}).done(function(data) {
  myApp.user.game = data.game;
}).fail(function(jqxhr) {
  console.error(jqxhr);
});



module.exports = true;
