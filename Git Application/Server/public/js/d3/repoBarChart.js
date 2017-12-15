$(document).ready(function() {
  showLoader();
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  var l = unescape(temp[1]);

  var url = 'http://localhost:3000/api/authorized/repo/' + getCookie("username") +
            '/' + l +'/contributors/' + getCookie("accessToken");

  var request = $.get( url, function(res) {

    var dataJsonObj = JSON.parse(res);
    var i = 0;
    var data = [];

    var sum = 0;

    while(i < dataJsonObj.length){
      var sum = sum + dataJsonObj[i].contributions;
      i++;
    }

    i = 0;

    while(i < dataJsonObj.length){
      var tmpObj = { letter: dataJsonObj[i].login, frequency: (dataJsonObj[i].contributions / sum )};
      console.log(tmpObj);
      data.push(tmpObj);
      i++;
    }

    initApp(data);

  });

});

function initApp(customData){

  var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(customData.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(customData, function(d) { return d.frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(customData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); });

      showApp();
}

function showApp(){
  document.getElementById("loading").style.display = 'none';
  document.body.style.backgroundColor = "white";
  document.getElementById("app").style.display = 'block';
}
function showLoader(){
  document.getElementById("app").style.display = 'none';
  document.body.style.backgroundColor = "white";
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
