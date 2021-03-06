$(document).ready(function() {
  showLoader();
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  var l = unescape(temp[1]);
  var username = getCookie("username");
  initApp(l, username);
});

function initApp(repo_name, username){
  var url = "/api/authorized/repo/" + username + '/'
            + repo_name + '/' + getCookie("accessToken");

  var request = $.get( url, function(res) {
    var dataJsonObj = JSON.parse(res);
    var data = {
      author: username,
      id: dataJsonObj.id,
      name: repo_name,
      description: dataJsonObj.description,
      url: dataJsonObj.html_url
    }
    insertData(data);
  }).then();
}

function insertData(data){
  document.getElementById("repo-id").setAttribute("src", data.id);
  document.getElementById("repo-author").innerHTML = data.author;
  document.getElementById("repo-url").innerHTML = data.url;
  document.getElementById("repo-description").innerHTML = data.description;
  document.getElementById("repo-name").innerHTML = data.name;

  // setTimeout(showApp,1000); // Allows The User to actually see the animation.
  // showSubMenu("followers");
  showSubMenu("commit-percent");
  showApp();
}

function destroyChildren(id) {
  var x = document.getElementById(id);
  while (x.firstChild) {
    x.removeChild(x.firstChild);
  }
}

function showSubMenu(type){
  destroyChildren("sub-menu-contents");

  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  var l = unescape(temp[1]);

  var subMenuContent = ""
  var barChartIframe = '<iframe src="http://localhost:3000/commits?repoName=' +
  l +
  '" width="960" height="600"></iframe>';
  var heatMapIframe = '<iframe src="http://localhost:3000/commit-heatmap?repoName=' +
  l +
  '" width="960" height="600"></iframe>';

  if(type == "commit-percent"){
    subMenuContent = barChartIframe;
    document.getElementById("sub-menu-contents").innerHTML = subMenuContent;
    var button1 = document.getElementById("commit-percent");
    var button2 = document.getElementById("commit-freq");
    button1.style.color = "#3cdc64";
    button2.style.color = "#c0c0c0";
  } else {
    subMenuContent = heatMapIframe;
    document.getElementById("sub-menu-contents").innerHTML = subMenuContent;
    var button1 = document.getElementById("commit-freq");
    var button2 = document.getElementById("commit-percent");
    button1.style.color = "#3cdc64";
    button2.style.color = "#c0c0c0"; // Button 2 is always grey.
  }


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
