exports.index = function(req, res) {
    res.sendfile('./public/index.html');
};

exports.profile = function(req, res) {
    console.log(req.cookies);
    res.sendfile('./public/profile/index.html');
};

exports.repos = function(req, res) {
    res.sendfile('./public/repositories/index.html');
};

exports.repo = function(req, res) {
    res.sendfile('./public/repository/index.html');
};

exports.githubCallback = function(req, res) {
    // res.sendfile('./public/repository/index.html');
};
