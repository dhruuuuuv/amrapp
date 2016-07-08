//modules ===
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongoose        = require('mongoose');

mongoose.connect('mongodb://dhruv:amr@ds015995.mlab.com:15995/cowllection'); //connect to database

var Nerd            = require('./app/models/nerd');

//config ===

//config files
var db = require('./config/db');

//set port
var port = process.env.PORT || 8080;

//connect to mongodb
//todo uncomment when credentials entered in config/db.js
//mongoose.connect(db.url)

//get data of the body / POST parameters

//parse app/json
app.use(bodyParser.json());

//parse app/vnd.api + json as json
app.use(bodyParser.json({ type: 'appliation/vnd.api+json' }));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//override with the XHTTP method override header in req. simulates delete / put
app.use(methodOverride('X-HTTP-Method-Override'));

//set static files location, eg /public/img is /img for users
app.use(express.static(__dirname + '/public'));

// routes === move routes to below doc once discrepancies are sorted?
// require('./app/routes')(app);

//routes for api ===
var router = express.Router(); // get instance of express Router

//middleware for all reqs
router.use(function(req, res, next) {
    //log
    console.log('something is happening');
    next(); //go to next routes
});

//test route to see if working
//at GET http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//add more api magic below

//register routes ===
// all routes are prefixed with /api
app.use('/api', router);

//start app ===
//at http://localhost:8080
app.listen(port);

//shout to user
console.log('Magic happens on port ' + port);

//expose app
exports = module.exports = app;
