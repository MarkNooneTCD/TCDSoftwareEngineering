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
APIrouter.get('/user/:userId', api.user);
APIrouter.get('/repo/:userId/:repoId', api.repo);
APIrouter.get('/repos/:userId', api.repos);

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


// Authentication Endpoints.
router.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // console.log("Got to the callback");
    console.log(req.user.accessToken);
    res.cookie('accessToken', req.user.accessToken, {maxAge : 9999});
    res.redirect('/user');
  });

// Configure Our Passport Github Strategy
passport.use(new GithubStrategy({
  clientID: "2baf2bb4537fead979cc",
  clientSecret: "e6311f85f1873482317b108f296cbb5485b914b6",
  callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use('/api', APIrouter);

// Start the server
app.listen(port);
console.log('Server hosted on: ' + port);
