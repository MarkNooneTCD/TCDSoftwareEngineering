// Load required packages
var express = require('express');
var webEndpoints = require('./webRoutes.js');
var api = require('./apiRoutes.js');

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create Both of our Express routers
var router = express.Router();
var APIrouter = express.Router();

// Create Routes for Web Router
router.get('/', webEndpoints.index);
router.get('/user', webEndpoints.profile);

// Register all our routes with a simple /
app.use('/', router);

// Allow access to public folder
app.use(express.static(__dirname + '/public'));

// Create Routes for API router
APIrouter.get('/', api.test);
APIrouter.get('/user', api.user);
// Register all API calls with /api
app.use('/api', APIrouter);

// Start the server
app.listen(port);
console.log('Server hosted on: ' + port);
