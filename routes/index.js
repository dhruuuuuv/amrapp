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
router.get('/superfarms/:farm_number/:animal_id', function(req, res, next) {
    // req.superfarm.populate('')
    // res.json(post);
    // Superfarm.findOne({ 'cows.animal_id' : req.params.animal_id }, function(err, superfarm) {
    //     if (err) {
    //         return (next(err));
    //     }
    //
    //         res.json(superfarm);
    //
    // });

    console.log("entered field");
    console.log(req.params.animal_id);

    // Superfarm.aggregate([
    //     {"$match" : {farm_number : req.params.farm_number}}
        // {"$unwind" : "$cows"},
        // {"$match" : { "cows.animal_id" : req.params.animal_id}},
    //     // {"$project" : {farm: "$"}}
    // Superfarm.find({ "farm_number" : 2 }
    // , function(err, cow) {
    //     if (err) {
    //         return (next(err));
    //         console.log("error happening");
    //     }

    Superfarm.findOne(
        { 'cows' : {"$elemMatch" : {'animal_id' : req.params.animal_id } } },
        {'cows.$' : 1},
        function(err, superfarm) {
            if (err) {
                return (next(err));
            }

            res.json(superfarm);
    });

        // console.log(JSON.stringify(Superfarm.find({ "farm_number" : 2 })));
        // res.json(cow);
    // });
});

//add more details from router

module.exports = router;
