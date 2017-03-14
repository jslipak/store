var mongoose = require("mongoose") 
var passportLocalMongoose = require("passport-local-mongoose")
var Schema = mongoose.Schema
var userSchema = new Schema ({})
userSchema.plugin(passportLocalMongoose)
module.export= mongoose.model('User', userSchema)
