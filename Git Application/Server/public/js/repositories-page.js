$(document).ready(function() {
  showLoader();
  initApp();
});

function initApp() {
  var url = "/api/authorized/repos/"+getCookie("accessToken");

  var request = $.get( url, function(res) {
    var dataJsonObj = JSON.parse(res);
    insertData(dataJsonObj);
    showApp();
  }).then();

}

function insertData(jsonRepoArray){
  var i = 0;
  var dataInjectionHtml = "";

  <!-- Line -->


  while(i < jsonRepoArray.length){
    dataInjectionHtml += '<div class="row"><div class="col-lg-12"><hr /></div></div>' +
                      '<div class="row repo-row" style="margin-top: 1vh; margin-bottom: 1vh;"><div class="col-lg-4 repository-info-heading"><h6>'+
                      jsonRepoArray[i].name +
                      '</h6></div><div class="col-lg-2 "><h6><span class="repo-label">ID:</span>'+
                      jsonRepoArray[i].id +
                      '</h6></div><div class="col-lg-5"><h6><span class="repo-label">Last Updated:</span>'+
                      jsonRepoArray[i].updated_at +
                      '<a href="/repo?repo_name=' +
                      jsonRepoArray[i].name +
                      '"><i class="fa fa-lg fa-chevron-right" style="position:relative; left: 100px; color: #19B5FE;"aria-hidden="true">'
                      +'</i></a></h6></div></div></div>';
    i++;
  }
  // debugger;
  document.getElementById("data-injection").innerHTML = dataInjectionHtml;
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
