//this is where CRUD would be done / include API routes in future

//get farm model
var Farm = require('./models/farm');

var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    console.log("communicating with Farm API");
    next();
});

//routes for /farms ======
router.route('/')

    //make a farm (@ POST localhost:8080/api/farms)
    .post(function(req, res) {

        var farm = new Farm(); //new farm model instance
        farm.farm_number = req.body.farm_number;
        farm.number_cows = req.body.number_cows;
        farm.number_samples_tested = req.body.number_samples_tested;
        farm.isolates_samples = req.body.isolates_samples;
        farm.esbl_isolates = req.body.esbl_isolates;
        farm.multidrug_res_isolates = req.body.multidrug_res_isolates;
        farm.amr_SXT = req.body.amr_SXT;
        farm.amr_CAZ = req.body.amr_CAZ;
        farm.amr_TE = req.body.amr_TE;
        farm.amr_EFT = req.body.amr_EFT;
        farm.amr_CIP = req.body.amr_CIP;
        farm.amr_CTX = req.body.amr_CTX;
        farm.amr_FOX = req.body.amr_FOX;
        farm.amr_AML = req.body.amr_AML;
        farm.amr_NA = req.body.amr_NA;
        farm.amr_IPM = req.body.amr_IPM;
        farm.amr_C = req.body.amr_C;
        farm.amr_P = req.body.amr_P;
        farm.amr_CL = req.body.amr_CL;
        farm.amr_AMC = req.body.amr_AMC;
        farm.amr_S = req.body.amr_S;

        //save farm and check for errors
        farm.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Farm created sucessfully!' });
        });
    })

    //get all farms @ localhost:8080/api/farms
    .get(function(req, res) {
        Farm.find(function(err, farms) {
            if (err) {
                res.send(err);
            }

            res.json(farms);
        });
    });

//routes for /farms/:farm_number ===
router.route('/:farm_number')

    //get farm with id @ localhost:8080/api/farms/:farm_number
    .get(function(req, res) {
        Farm.findOne({ 'farm_number' : req.params.farm_number }, function(err, farm) {
            if (err) {
                res.send(err);
            }

            res.json(farm);
        });
    })

    //update farm with id PUT @ localhost:8080/api/farms/:farm_number
    .put(function(req, res) {

        //use farm model to find farm
        Farm.findOne({ 'farm_number' : req.params.farm_number }, function(err, farm) {
            if (err) {
                res.send(err);
            }

            // farm.amr_res_levels = req.body.amr_res_levels; // update the farm info
            console.log("updates working but nothing happening");

            // save farm
            farm.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Farm updated!' });
            });
        });

    })

    //delete farm with id @ DELETE localhost:8080/api/farms/:farm_number
    .delete(function(req, res) {
        Farm.remove({
            'farm_number' : req.params.farm_number
        }, function(err, farm) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'sucessfully deleted farm' });
        });
    });


module.exports = router;
