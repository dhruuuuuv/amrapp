//modules ===
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongoose        = require('mongoose');


//import routing from app
var nerds           = require('./app/nerds');
var farms           = require('./app/farms');

//config ===

//config files
var db = require('./config/db');

//connect to mongodb
mongoose.connect(db.url)

//set port
var port = process.env.PORT || 8080;


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

// routes ===
app.use('/api/nerds', nerds);
app.use('/api/farms', farms);

//frontend routes ===
//route to handle angular requests
//catch-all route
app.get('*', function(req, res) {
//perhaps should be sendFile? note if doesn't work
    res.sendfile('./public/index.html'); // loads public/index.html file to route url
});

//start app ===
//at http://localhost:8080
app.listen(port);

//shout to user
console.log('server open on port ' + port);

//expose app
exports = module.exports = app;
