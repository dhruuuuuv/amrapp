var mongoose    = require('mongoose');

var Isolates = new mongoose.Schema({
    isolate_number          : {type: Number, default: 0},
    antimicrobial           : [
        { name: String }, {value : Number, default: 0 }
    ]
});

var Samples = new mongoose.Schema({
    date_sampled            : {type: Number, default: 0},
    date_sampled_days       : {type: Number, default: 0},
    DIM_at_sampling         : {type: Number, default: 0},
    mean_305d_milk          : {type: Number, default: 0},
    isolates                : [Isolates]
});

var Cows  = new mongoose.Schema({
    animal_id               : {type: Number, default: 0},
    parity                  : {type: Number, default: 0},
    latest_calving          : {type: Number, default: 0},
    latest_calving_days     : {type: Number, default: 0},
    samples                 : [Samples]
});

var Superfarms  = new mongoose.Schema({
    farm_number             : {type: Number, default: 0},
    cows                    : [Cows],
    questionnaire           : [
        { question: String }, { answer: Number, default: -1}
    ]
});

// FarmSchema.methods.deleteFarm = function(cb) {
//     this.number_cows += 1;
//     this.save(cb);
// }

mongoose.model('Superfarm', Superfarms);
