'use strict';

window.myApp = {
    baseUrl: 'http://tic-tac-toe.wdibos.com',
};
//------------------------------------------------------------------------------
//--------------------------------GAME LOGIC------------------------------------
//----------------Update Game Count----------------
let updateGameCount = function () {
    $.ajax({
      url: myApp.baseUrl + '/games?over=true',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      }
    }).done(function(data)  {
      let count = 0;
      for (let i = 0; i < data.games.length; i++) {
        count++;
      }
      $('.gameCount').text("User: " + myApp.user.email  + "  |  " + " Win Ratio: " + ((count / data.games.length) * 100) + "%");
      $('.gameCount').show();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  };

$(document).ready(() => {
//------------------------------------------------------------------------------
//---------------------------User Manager---------------------------------------
//----------------SIGN UP----------------
  $('#signup-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      $('#myModal2').modal('hide');
      $('.sign-up1').hide();
      $('.change-password1').hide();
      $('.sign-out1').hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------SIGN IN----------------
  $('#signin-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log("Welcome " + data.user.email);
      $('#myModal1').modal('hide');
      $('.sign-in1').hide();
      $('.sign-up1').hide();
      $('.sign-out1').show();
      $('.change-password1').show();
      myApp.user = data.user;
      updateGameCount();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------CHANGE PASSWORD----------------
  $('#changepass-form').on('submit', function(e) {
    e.preventDefault();
    if(!myApp.user) {
      console.error("Wrong!!!");
      return;
    }
    var formData = new FormData(e.target);
    console.log(formData);
    $.ajax({
      url: myApp.baseUrl + '/change-password/' + myApp.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log("Password changed");
      $('#myModal3').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------SIGN OUT----------------
  $('.sign-out2').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      }
    }).done(function() {
      $('#myModal4').modal('hide');
      $('.sign-in1').show();
      $('.sign-up1').show();
      $('.sign-out1').hide();
      $('.change-password1').hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
});

module.exports = true;
