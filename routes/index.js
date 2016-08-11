var mongoose = require('mongoose');
var Farm = mongoose.model('Farm');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get farms
router.get('/farms', function(req, res, next) {
    Farm.find(function(err, farms){
        if(err) {return next(err); }

        res.json(farms);
    });
});

router.post('/farms', function(req, res, next) {

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

    farm.save(function(err, farm){
        if (err) {
            return next(err);
        }

        res.json(farm);
    });
});


//preload post using mogoose query fn
// router.param('farm', function(req, res, next, id) {
//     var query = Farm.findById(id);
//
//     query.exec(function (err, post) {
//         if (err) {
//             return next(err);
//         }
//
//         if (!post) {
//             return next(new Error('can\'t find farm'));
//         }
//
//         req.farm = farm;
//         return(next);
//     });
// });

//route to get a single farm
router.get('/farms/:farm_number', function(req, res, next) {
    // req.post.populate('')
    // res.json(post);
    Farm.findOne({ 'farm_number' : req.params.farm_number }, function(err, farm) {
        if (err) {
            return (next(err));
        }

        res.json(farm);
    });
});

//route to update a farm
router.put('/farms/:farm_number', function(req, res, next) {

    Farm.findOne({ 'farm_number' : req.params.farm_number }, function(err, farm) {
        if (err) {
            return (next(err));
        }

        console.log("updates working but nothing happening");

        farm.save(function(err, farm) {
            if (err) {
                return next(err);
            }

            res.json(farm);
        });
    });
});

router.delete('/farms/:farm_number', function(req, res, next) {
    Farm.remove({
        'farm_number' : req.params.farm_number
    }, function(err, farm) {
        if (err) {
            return next(err);
        }

        res.json({message: 'successfully deleted farm' });
    });
});

//add more details from router

module.exports = router;
