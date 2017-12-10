const axios = require('axios');

// Test Api to show working request
exports.test = function(req, res) {
  res.json({message: "API is working!"});
}

// Dummy endpoints that will relay dummy information.
exports.user = function(req, res) {
  const urlUser = "https://api.github.com/users/" + req.params.userId;
  axios.get(urlUser)
    .then(response => {
      // console.log( response.data );
      res.json(response.data);
    });
}

exports.repo = function(req, res) {
  const urlRepo = "https://api.github.com/repos/" + req.params.userId + "/" +req.params.repoId;
  axios.get(urlRepo)
    .then(response => {
      // console.log( response.data );
      res.json(response.data);
    });

}

exports.repos = function(req, res) {
  const urlRepos = "https://api.github.com/users/" + req.params.userId + "/repos" ;
  axios.get(urlRepos)
    .then(response => {
      // console.log( response.data );
      res.json(response.data);
    });
}
