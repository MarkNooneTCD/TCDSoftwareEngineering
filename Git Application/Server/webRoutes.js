exports.index = function(req, res) {
    res.sendfile('./public/index.html');
};

exports.profile = function(req, res) {
    res.sendfile('./public/profile/index.html');
};
