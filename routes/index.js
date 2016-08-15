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

        superfarms.populate('cows');

        res.json(superfarms);
    });
});

router.post('/superfarms', function(req, res, next) {

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
router.get('/superfarms/:farm_number', function(req, res, next) {
    // req.post.populate('')
    // res.json(post);
    Superfarm.findOne({ 'farm_number' : req.params.farm_number }, function(err, superfarm) {
        if (err) {
            return (next(err));
        }

        superfarm.populate('cows');

        res.json(superfarm);
    });
});

//route to update a farm
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
//
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
// router.get('/superfarms/:farm_number/cows', function(req, res, next) {
//     // req.post.populate('')
//     // res.json(post);
//     Superfarm.findOne({ 'farm_number' : req.params.farm_number }, function(err, superfarm) {
//         if (err) {
//             return (next(err));
//         }
//
//         res.json(superfarm);
//     });
// });

//add more details from router

module.exports = router;
