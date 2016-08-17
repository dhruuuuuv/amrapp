var mongoose = require('mongoose');
var Superfarm = mongoose.model('Superfarm');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get all farms
router.get('/superfarms', function(req, res, next) {
    Superfarm.find(function(err, superfarms){
        if(err) {return next(err); }

        // superfarms.populate('cows');

        res.json(superfarms);
    });
});

router.post('/superfarms', function(req, res, next) {

    Superfarm.findOne({ 'farm_number' : req.params.farm_number }, function(err, superfarm) {
        if (err) {
            return (next(err));
        }

        console.log("farm already exists");
        return;
        });

    var superfarm = new Superfarm(); //new farm model instance
    superfarm.farm_number = req.body.farm_number;
    superfarm.number_cows = req.body.number_cows;

    superfarm.save(function(err, superfarm){
        if (err) {
            return next(err);
        }

        res.json(superfarm);
    });
});

//route to get a single farm
router.get('/superfarms/:farm_number', function(req, res, next) {
    // req.post.populate('')
    // res.json(post);
    Superfarm.findOne({ 'farm_number' : req.params.farm_number }, function(err, superfarm) {
        if (err) {
            return (next(err));
        }

        res.json(superfarm);
    });
});

// route to update a farm
// router.put('/superfarms/:farm_number', function(req, res, next) {
//
//     Superfarm.findOne({ 'farm_number' : req.params.farm_number }, function(err, superfarm) {
//         if (err) {
//             return (next(err));
//         }
//
//         console.log("updates working but nothing happening");
//
//         superfarm.save(function(err, superfarm) {
//             if (err) {
//                 return next(err);
//             }
//
//             res.json(superfarm);
//         });
//     });
// });

// router.delete('/superfarms/:farm_number', function(req, res, next) {
//     // Farm.findOne({ 'farm_number' : req.params.farm_number }, function(err, farm), function(err, farm) {
//     //     if (err) {
//     //         return next(err);
//     //     }
//     //
//     //     res.json({message: 'successfully deleted farm' });
//     // });
// });
//
// route to get cow with animal id from farm
router.get('/superfarms/:farm_number/:animal_id', function(req, res, next) {
    Superfarm.findOne(
        { 'cows' : {"$elemMatch" : {'animal_id' : req.params.animal_id } } },
        {'cows.$' : 1},
        function(err, superfarm) {
            if (err) {
                return (next(err));
            }

            res.json(superfarm);
    });
});

//route to get isolate from animal id etc.
router.get('/superfarms/:farm_number/:animal_id/:isolate_number', function(req, res, next) {
    Superfarm.findOne(
        { 'cows' : {"$elemMatch" : {'animal_id' : req.params.animal_id } } },
        { 'cows.$' : 1 },
        // { 'cows.isolates' : {"$elemMatch" : {'isolate_number' : req.params.isolate_number } } },
        // { 'cows.isolates.$' : 1 },
        function(err, superfarm) {
            if (err) {
                return (next(err));
            }

            console.log(superfarm);
            res.json(superfarm);
    });
});

//add more details from router

module.exports = router;
