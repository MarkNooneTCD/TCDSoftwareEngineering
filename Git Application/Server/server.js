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

// Register all our routes with a simple /
app.use('/', router);

// Create Routes for API router
APIrouter.get('/', api.test);

// Register all API calls with /api
app.use('/api', APIrouter);

// Start the server
app.listen(port);
console.log('Server hosted on: ' + port);
