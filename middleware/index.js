
var middleware={}
var Comment = require("../models/comment"),
    Product = require("../models/product")

middleware.isLoggedIn=function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }else{
    res.redirect("/login")
  }
}

module.exports = middleware
