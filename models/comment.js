var mongoose = require("mongoose"),
 schema = mongoose.Schema,
 commentSchema = new schema({
     author:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     },
     body: String
 });

 module.exports = mongoose.model('Comment',commentSchema);