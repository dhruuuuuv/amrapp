//get mongoose module
var mongoose = require('mongoose');

//define nerd model
//using module.exports can pass to other files when called
//add more fields below if needed see mongoose docs http://mongoosejs.com/docs/guide.html
module.exports = mongoose.model('Nerd', {
    name : {type : String, default: ''}
});
