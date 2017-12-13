const axios = require('axios');
const request = require('request');

// Test Api to show working request
exports.test = function(req, res) {
  res.json({message: "API is working!"});
}

// Public Endpoint Calls
exports.user = function(req, res) {
  const urlUser = "https://api.github.com/users/" + req.params.username;
  axios.get(urlUser)
    .then(response => {
      // console.log( response.data );
      res.json(response.data);
    });
}

exports.repo = function(req, res) {
  const urlRepo = "https://api.github.com/repos/" + req.params.username + "/" +req.params.repoName;
  axios.get(urlRepo)
    .then(response => {
      // console.log( response.data );
      res.json(response.data);
    });

}

exports.repos = function(req, res) {
  const urlRepos = "https://api.github.com/users/" + req.params.username + "/repos" ;
  axios.get(urlRepos)
    .then(response => {
      // console.log( response.data );
      res.json(response.data);
    });
}

// Authorized endpoint Calls (Needed for private repositories.)

exports.authUser = function(req, res) {
  var options = {
    method: 'GET',
    url: 'https://api.github.com/user',
    headers:
     {
       'postman-token': '63498122-80c7-2e9d-e8c3-93bb8baabfe0',
       'cache-control': 'no-cache',
       authorization: 'token '+req.params.authToken,
       'User-Agent': 'MarkNooneTCD'
     }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log( body );
    res.send(body);
  });
}

exports.authRepo = function(req, res) {
  const urlRepo = "https://api.github.com/repos/" + req.params.username + "/" +req.params.repoName;
  var options = {
    method: 'GET',
    url: 'https://api.github.com/repos/' + req.params.username + "/" +req.params.repoName,
    headers:
     {
       'postman-token': '63498122-80c7-2e9d-e8c3-93bb8baabfe0',
       'cache-control': 'no-cache',
       authorization: 'token '+req.params.authToken,
       'User-Agent': 'MarkNooneTCD'
     }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log( body );
    res.send(body);
  });

}

exports.authRepos = function(req, res) {
  var options = {
    method: 'GET',
    url: 'https://api.github.com/user/repos',
    headers:
     {
       'postman-token': '63498122-80c7-2e9d-e8c3-93bb8baabfe0',
       'cache-control': 'no-cache',
       authorization: 'token '+req.params.authToken,
       'User-Agent': 'MarkNooneTCD'
     }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log( body );
    res.send(body);
  });
}
