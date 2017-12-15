// Object Json
var customData = {
 "name": "MarkNooneTCD",
 "profileInfo": {
   "size" : 59380,
   "location": "Dublin, Ireland",
   "company": "Where you think I work",
   "url": "https://github.com/MarkNooneTCD",
   "avatar_url": "https://avatars3.githubusercontent.com/u/18034146?v=4"
 },
 "children": [
  {
   "name": "analytics",
   "children": [
    {
     "name": "cluster",
     "children": [
      {"name": "AgglomerativeCluster", "size": 39380},
      {"name": "CommunityStructure", "size": 3812},
      {"name": "HierarchicalCluster", "size": 6714},
      {"name": "MergeEdge", "size": 743}
      ]
    }
    ]
   }
  ]
};


// Graph Code
window.onload = function() {
  showLoader();
  getConnectedUsers();

}

// Only to the first degree, but can be easily made recursive for more.
// Only from people to whow you follow and are followed by.
function getConnectedUsers() {

  var data = {};

  // User request to get the base node.
  var url = "http://localhost:3000/api/authorized/user/" + getCookie("accessToken");
  // console.log(url);
  var request = $.get( url, function(res) {

    var dataJsonObj = JSON.parse(res);
    data.name = dataJsonObj.login;
    data.size = 5938;
    data.profileInfo = {
      "url": dataJsonObj.html_url,
      "avatar_url": dataJsonObj.avatar_url
    };
    document.getElementById("github-username").innerHTML = dataJsonObj.login;
    document.getElementById("github-url").innerHTML = dataJsonObj.html_url;
    document.getElementById("github-profile-pic").src = dataJsonObj.avatar_url;
    getUsers(data.name, data);
  });
}

function getUsers(user, data){

  console.log("Getting Followers");
  data.children = []

  // console.log(user);
  var followersUrl = "http://localhost:3000/api/followers/"+user;
  var followingUrl = "http://localhost:3000/api/following/"+user;

  var users = [];
  if(usernameCheck == null)
    var usernameCheck = [];

  var followerRequest = $.get( followersUrl, function(res) {
    console.log("Have Followers");
    var i = 0;
    while(i<res.length){
      var tmpData = {};
      tmpData.name = res[i].login;
      tmpData.size = 5938;
      tmpData.profileInfo = {
        "url": res[i].html_url,
        "avatar_url": res[i].avatar_url
      };
      console.log(tmpData);
      data.children.push(tmpData);
      i++;
    }

  }).then(function() {

    console.log("Getting Followingers");
    var followingRequest = $.get( followingUrl, function(res) {

      var i = 0;
      while(i<res.length){
        var tmpData = {};
        tmpData.name = res[i].login;
        tmpData.size = 5938;
        tmpData.profileInfo = {
          "url": res[i].html_url,
          "avatar_url": res[i].avatar_url
        };
        data.children.push(tmpData);
        i++;
      }
    }).then(function() {
      console.log("Showing Full Data");
      console.log(data);
      root = data;
      update();
      showApp();
    });
  });

}


var width = window.innerWidth,
    height = window.innerHeight - 400,
    root;

var force = d3.layout.force()
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");


function update() {
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .start();

  // Update the links…
  link = link.data(links, function(d) { return d.target.id; });

  // Exit any old links.
  link.exit().remove();

  // Enter any new links.
  link.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  // Update the nodes…
  node = node.data(nodes, function(d) { return d.id; }).style("fill", color);

  // Exit any old nodes.
  node.exit().remove();

  // Enter any new nodes.
  node.enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
      .style("fill", color)
      .on("click", click)
      .call(force.drag);
}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

// Color leaf nodes orange, and packages white or blue.
function color(d) {
  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}

// Toggle children on click.
function click(d) {
  // if (!d3.event.defaultPrevented) {
  //   if (d.children) {
  //     d._children = d.children;
  //     d.children = null;
  //   } else {
  //     d.children = d._children;
  //     d._children = null;
  //   }
  //   update();
  // }
  if(d.profileInfo) {
    document.getElementById("github-username").innerHTML = d.name;
    document.getElementById("github-url").innerHTML = d.profileInfo.url;
    document.getElementById("github-profile-pic").src = d.profileInfo.avatar_url;
  }
}

// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [], i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
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
