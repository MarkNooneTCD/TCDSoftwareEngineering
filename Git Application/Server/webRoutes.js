exports.index = function(req, res) {
    res.sendfile('./public/index.html');
};

exports.profile = function(req, res) {
    res.sendfile('./public/profile/index.html');
};

exports.repos = function(req, res) {
    res.sendfile('./public/repositories/index.html');
};

exports.repo = function(req, res) {
    res.sendfile('./public/repository/index.html');
};
