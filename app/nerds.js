//this is where CRUD would be done / include API routes in future

//get nerd model
var Nerd = require('./models/nerd');

var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    console.log("communicating with API");
    next();
});

// router.get('/', function(req, res) {
//     res.json({ message: 'welcome to our api!' });
// });

//routes for /nerds ======
router.route('/')

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
router.route('/:nerd_id')

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


module.exports = router;
