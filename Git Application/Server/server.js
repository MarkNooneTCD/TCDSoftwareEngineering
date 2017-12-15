// Load required packages
var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var webEndpoints = require('./webRoutes.js');
var api = require('./apiRoutes.js');
var GithubStrategy = require('passport-github2').Strategy;

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create Both of our Express routers
var router = express.Router();
var APIrouter = express.Router();

// Create Routes for API router
APIrouter.get('/', api.test);
APIrouter.get('/user/:username', api.user);
APIrouter.get('/repo/:username/:repoName', api.repo);
APIrouter.get('/repos/:username', api.repos);
APIrouter.get('/followers/:username', api.followers);
APIrouter.get('/following/:username', api.following);

// Authorized api calls only
APIrouter.get('/authorized/user/:authToken', api.authUser);
APIrouter.get('/authorized/repo/:username/:repoName/:authToken', api.authRepo);
APIrouter.get('/authorized/repo/:username/:repoName/contributors/:authToken', api.authContributors);
APIrouter.get('/authorized/repos/:authToken', api.authRepos);



// Authentication check
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// Create Routes for Web Router
router.get('/', webEndpoints.index);
router.get('/user', webEndpoints.profile);
router.get('/repos', webEndpoints.repos);
router.get('/repo', webEndpoints.repo);
router.get('/connected-graph', webEndpoints.connectedUser);
router.get('/commits', webEndpoints.commitFreq);
router.get('/commit-heatmap', webEndpoints.commitHeatMap);


// Authentication Endpoints.
router.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // console.log("Got to the callback");
    console.log("Endpoint Callback: "+req.user.accessToken);
    var hour = 3600000;
    res.cookie('accessToken', req.user.accessToken, {maxAge : 14 * 24 * hour, httpOnly: false});
    res.status(200).redirect("/user");
  });

// Configure Our Passport Github Strategy
passport.use(new GithubStrategy({
  clientID: "2baf2bb4537fead979cc",
  clientSecret: "e6311f85f1873482317b108f296cbb5485b914b6",
  callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("Strategy Call: "+accessToken);
    process.nextTick(function () {
      return done(null, {accessToken:accessToken, refreshToken:refreshToken, profile:profile});
    });
  }
));

// Serialize and Deserialize the users
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Make Our App configurations
app.use(cookieParser());
app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
 });
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use('/api', APIrouter);

// Start the server
app.listen(port);
console.log('Server hosted on: ' + port);
