var mongoose    = require('mongoose');

var FarmSchema  = new mongoose.Schema({
    farm_number             : {type: Number, default: 0},
    number_cows             : {type: Number, default: 0},
    number_samples_tested   : {type: Number, default: 0},
    isolates_samples        : {type: Number, default: 0},
    esbl_isolates           : {type: Number, default: 0},
    multidrug_res_isolates  : {type: Number, default: 0},
    amr_SXT                 : {type: Number, default: 0},
    amr_CAZ                 : {type: Number, default: 0},
    amr_TE                  : {type: Number, default: 0},
    amr_EFT                 : {type: Number, default: 0},
    amr_CIP                 : {type: Number, default: 0},
    amr_CTX                 : {type: Number, default: 0},
    amr_FOX                 : {type: Number, default: 0},
    amr_AML                 : {type: Number, default: 0},
    amr_NA                  : {type: Number, default: 0},
    amr_IPM                 : {type: Number, default: 0},
    amr_C                   : {type: Number, default: 0},
    amr_P                   : {type: Number, default: 0},
    amr_CL                  : {type: Number, default: 0},
    amr_AMC                 : {type: Number, default: 0},
    amr_S                   : {type: Number, default: 0}
});

// FarmSchema.methods.deleteFarm = function(cb) {
//     this.number_cows += 1;
//     this.save(cb);
// }

mongoose.model('Farm', FarmSchema);
