var mongoose = require('mongoose'),
 schema = mongoose.Schema
 productSchema = new schema({
     nameProduct:{type: String , require:true},
     descriptionProduct: String,
     price: Number,
     author:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
     },
     comment:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
     }]
 })

module.exports = mongoose.model ('Product' , productSchema)