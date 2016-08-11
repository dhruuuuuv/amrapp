//get mongoose module
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var FarmSchema  = new Schema({
    farm_number             : Number,
    number_cows             : Number,
    number_samples_tested   : Number,
    isolates_samples        : Number,
    esbl_isolates           : Number,
    multidrug_res_isolates  : Number,
    amr_SXT                 : Number,
    amr_CAZ                 : Number,
    amr_TE                  : Number,
    amr_EFT                 : Number,
    amr_CIP                 : Number,
    amr_CTX                 : Number,
    amr_FOX                 : Number,
    amr_AML                 : Number,
    amr_NA                  : Number,
    amr_IPM                 : Number,
    amr_C                   : Number,
    amr_P                   : Number,
    amr_CL                  : Number,
    amr_AMC                 : Number,
    amr_S                   : Number
});

module.exports = mongoose.model('Farm', FarmSchema);


// //define nerd model
// //using module.exports can pass to other files when called
// //add more fields below if needed see mongoose docs http://mongoosejs.com/docs/guide.html
// module.exports = mongoose.model('Nerd', {
//     name : {type : String, default: ''}
// });
