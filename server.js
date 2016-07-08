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
    console.log("communicating with API");
    next(); //go to next routes
});

//test route to see if working
//at GET http://localhost:8080/api
router.get('/', function(req, res) {
    //sending back as json
    res.json({ message: 'hooray! welcome to our api!' });
});

//add more api magic below

//routes for /nerds === ===
router.route('/nerds')

    //make a nerd (@ POST localhost:8080/api/nerds)
    .post(function(req, res) {

        var nerd = new Nerd(); //new nerd model instance
        nerd.name = req.body.name; //set nerd name

        //save nerd and check for errors
        nerd.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Nerd created!' });
        });
    })

    //get all nerds @ localhost:8080/api/nerds
    .get(function(req, res) {
        Nerd.find(function(err, nerds) {
            if (err) {
                res.send(err);
            }

            res.json(nerds);
        });
    });

//routes for /nerds/:nerd_id ===
router.route('/nerds/:nerd_id')

    //get nerd with id @ localhost:8080/api/nerds/:nerd_id
    .get(function(req, res) {
        Nerd.findById(req.params.nerd_id, function(err, nerd) {
            if (err) {
                res.send(err);
            }

            res.json(nerd);
        });
    })

    //update nerd with id PUT @ localhost:8080/api/nerds/:nerd_id
    .put(function(req, res) {

        //use nerd model to find nerd
        Nerd.findById(req.params.nerd_id, function(err, nerd) {

            if (err) {
                res.send(err);
            }

            nerd.name = req.body.name; // update the nerd info

            // save nerd
            nerd.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Nerd updated!' });
            });
        });

    })

    //delete nerd with id @ DELETE localhost:8080/api/nerds/:nerd_id
    .delete(function(req, res) {
        Nerd.remove({
            _id: req.params.nerd_id
        }, function(err, nerd) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'sucessfully deleted' });
        });
    });

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
