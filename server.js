//modules ===
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

//config ===

//config files
var db = require('./config/db');

//set port
var post = process.env.PORT || 8080;

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

// routes ===
require('./app/routes')(app);

//start app ===
//at http://localhost:8080
app.listen(port);

//shout to user
console.log('Magc happens on port ' + port);

//expose app
exports = module.exports = app;
