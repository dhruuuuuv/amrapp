var mongoose = require('mongoose');

var SampleSchema = new mongoose.Schema({
    sample_number       : {type: Number, default: 0},
    isolate             : {type: Number, default: 0},
    animal_id           : {type: Number, default: 0},
    parity              : {type: Number, default: 0},
    latest_calving      : {type: Number, default: 0},
    latest_calving_days : {type: Number, default: 0},
    date_sampled        : {type: Number, default: 0},
    date_sampled_days   : {type: Number, default: 0},
    DIM_at_sampling     : {type: Number, default: 0},
    mean_305d_milk      : {type: Number, default: 0},
    CAZ                 : {type: Number, default: 0},
    EFT                 : {type: Number, default: 0},
    CIP                 : {type: Number, default: 0},
    CTX                 : {type: Number, default: 0},
    NA                  : {type: Number, default: 0},
    SXT                 : {type: Number, default: 0},
    TE                  : {type: Number, default: 0},
    FOX                 : {type: Number, default: 0},
    AML                 : {type: Number, default: 0},
    IPM                 : {type: Number, default: 0},
    C                   : {type: Number, default: 0},
    P                   : {type: Number, default: 0},
    CL                  : {type: Number, default: 0},
    AMC                 : {type: Number, default: 0},
    S                   : {type: Number, default: 0},
    flouros_count       : {type: Number, default: 0},
    CEF_3_4_count       : {type: Number, default: 0},
    fluros              : {type: Number, default: 0},
    CEF_3_4             : {type: Number, default: 0},
    MDR                 : {type: Number, default: 0},
    MDR3                : {type: Number, default: 0},
    MDR4                : {type: Number, default: 0}
});

mongoose.model('Sample', SampleSchema);
