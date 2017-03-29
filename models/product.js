var mongoose = require('mongoose'),
 schema = mongoose.Schema
 productSchema = new schema({
     nameProduct:{type: String , require:true},
     descriptionProduct: String,
     urlImageProduct: String,
     price: Number,
     author:{ 
          id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
     },
     comment:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
     }]
 })

module.exports = mongoose.model ('Product' , productSchema)