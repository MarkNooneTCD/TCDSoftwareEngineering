$(document).ready(function() {
  showLoader();
  initApp();
});


function initApp(){
  var url = "/api/authorized/user/"+getCookie("accessToken");
  // console.log(url);
  var request = $.get( url, function(res) {
    var dataJsonObj = JSON.parse(res);

    var data = {
      username: dataJsonObj.login,
      id: dataJsonObj.id,
      location: dataJsonObj.location,
      company: dataJsonObj.company,
      githubProfileUrl: dataJsonObj.avatar_url,
      bio: dataJsonObj.bio,
      followers: dataJsonObj.followers,
      following: dataJsonObj.following,
      profileUrl: dataJsonObj.html_url
    }
    insertData(data);
    return res;

  }).then(function(res) {
    var data= JSON.parse(res);
    var followersUrl = "http://localhost:3000/api/followers/"+data.login;
    var followingUrl = "http://localhost:3000/api/following/"+data.login;

    var followerReq = $.get(followersUrl, function(followersRes) {
      var followerKeys= Object.keys(followersRes);
      var followerArray = [];
      for(var key in followerKeys){
        var follower = followersRes[key];
        var tmp = { profile_url: follower.avatar_url, username: follower.login };
        followerArray.push(tmp);
      }
      console.log(followerArray);
      localStorage && (localStorage.followerArray = JSON.stringify(followerArray));
    })
    .then(function(){

      var followingReq = $.get(followingUrl, function(followingRes) {
        var followingKeys= Object.keys(followingRes);
        var followingArray = [];
        for(var key in followingKeys){
          var following = followingRes[key];
          var tmp = { profile_url: following.avatar_url, username: following.login };
          followingArray.push(tmp);
        }
        console.log(followingArray);
        localStorage && (localStorage.followingArray = JSON.stringify(followingArray));
      }).then(function(){
        showSubMenu("followers");
        showApp();
      });

    });

  })/*
  .done(function() {
    showApp();
  })*/;
}

function insertData(data) {
  document.getElementById("github-profile-pic").setAttribute("src", data.githubProfileUrl);
  document.getElementById("github-company").innerHTML = data.company;
  document.getElementById("github-url").innerHTML = data.profileUrl;
  document.getElementById("github-bio").innerHTML = data.bio;

  document.getElementById("github-username").innerHTML = data.username;
  document.getElementById("github-location").innerHTML = data.location;
  // Github ID Not Included
  // setTimeout(showApp,1000); // Allows The User to actually see the animation.
  document.cookie = "username=" + data.username;
  showApp();
}


function showApp(){
  document.getElementById("loading").style.display = 'none';
  document.body.style.backgroundColor = "white";
  document.getElementById("app").style.display = 'block';
}
function showLoader(){
  document.getElementById("app").style.display = 'none';
  document.body.style.backgroundColor = "#2f353e";
  document.getElementById("loading").style.display = 'block';
}

function destroyChildren(id) {
  var x = document.getElementById(id);
  while (x.firstChild) {
    x.removeChild(x.firstChild);
  }
}

function showSubMenu(type){
  destroyChildren("sub-menu-contents");
  var id="";
  var subMenuContent = "";
  if(type == "followers") {
    if (localStorage && 'followerArray' in localStorage) {
      var array = JSON.parse(localStorage.followerArray);
      console.log("Follower Array in Local Storage");
      id="followers";
    }
  } else {
    if (localStorage && 'followingArray' in localStorage) {
      var array = JSON.parse(localStorage.followingArray);
      console.log("Following Array in Local Storage");
      id="following";
    }
  }
  var i = 0;
  while(i < array.length){
    subMenuContent += fillSubMenuTemplate(array[i].username, array[i].profile_url);
    i++;
  }
  document.getElementById("sub-menu-contents").innerHTML = subMenuContent;
  if(id == "followers"){
    var button1 = document.getElementById("followers");
    var button2 = document.getElementById("following");
    button1.style.color = "#3cdc64";
    button2.style.color = "#c0c0c0";
  } else {
    var button1 = document.getElementById("following");
    var button2 = document.getElementById("followers");
    button1.style.color = "#3cdc64";
    button2.style.color = "#c0c0c0"; // Button 2 is always grey.
  }


}

function fillSubMenuTemplate(name, profile) {
  return '<div class="col-lg-2" style="margin-top: 20px;"><div class="row justify-content-center"><img class="follow-picture" src="'+
          profile +
          ' " /></div><div class="row justify-content-center" style="margin-top: 10px;"><p class="follow-username">' +
          name +
          '</p></div></div>' ;
}

function getCookie(name) {
  var getCookieValues = function(cookie) {
		var cookieArray = cookie.split('=');
		return cookieArray[1].trim();
	};

	var getCookieNames = function(cookie) {
		var cookieArray = cookie.split('=');
		return cookieArray[0].trim();
	};

	var cookies = document.cookie.split(';');
	var cookieValue = cookies.map(getCookieValues)[cookies.map(getCookieNames).indexOf(name)];
	return (cookieValue === undefined) ? null : cookieValue;

}
