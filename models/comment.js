var mongoose = require("mongoose")

var commentSchema = new mongoose.Schema({
  productId: String , 
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  body: String,
  date: { type: Date, default: Date.now }
})

module.exports= mongoose.model("Comment", commentSchema)