$(document).ready(function() {
  console.log(getCookie("accessToken"));
  showLoader();
});

setTimeout(hideLoader, 5000);

function hideLoader(){
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
