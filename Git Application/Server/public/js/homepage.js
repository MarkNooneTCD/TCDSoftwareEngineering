const githubLoginCall = "https://github.com/login/oauth/authorize?scope=user:email&client_id=2baf2bb4537fead979cc";

$(document).ready(function() {

  $("#login-button").click(function() {
    $.get( githubLoginCall, function( data ) {
      console.log(data);
    });
  });

  // $("#profile-tag").click(function() {alert("Hello, repo!");});
});
